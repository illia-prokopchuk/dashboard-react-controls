/*
Copyright 2019 Iguazio Systems Ltd.

Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
import { useEffect, useRef, useState } from 'react'
import { get, omit } from 'lodash'

export const useFormTable = (formState) => {
  // `editingItem` should contain the `data` object with all fields that are used in the `formState`.
  // Properties that aren't used in the `formState` should be placed directly in the `editingItem` object
  // `editingItem` also has an `ui` property which is used internally in this hook
  //
  // e.g.
  // editingItem = {
  //   data: {
  //     <fieldName>: <fieldValue>,
  //     <fieldName2>: <fieldValue2>
  //   },
  //   <anotherProperty>: <anotherPropertyValue>
  //   ui: {
  //     isNew: <true|false>, // `true` if we are creating a new row, if we are editing it's `false`
  //     fieldsPath: <"the.path">, // the path where table data is placed in the `formState`
  //     index: <0|1|...> // index of the editing row
  //   }
  // }
  const [editingItem, setEditingItem] = useState(null)
  const editingItemRef = useRef(null)
  const bottomScrollRef = useRef(null)

  useEffect(() => {
    editingItemRef.current = editingItem
  }, [editingItem])

  useEffect(() => {
    return () => {
      if (editingItemRef.current?.ui?.isNew) {
        formState.form.mutators.remove(
          editingItemRef.current.ui.fieldsPath,
          editingItemRef.current.ui.index
        )

        if (editingItemRef.current.ui.index === 0) {
          formState.form.mutators.concat(editingItemRef.current.ui.fieldsPath, [])
        }
      } else if (editingItemRef.current) {
        formState.form.mutators.update(
          editingItemRef.current.ui.fieldsPath,
          editingItemRef.current.ui.index,
          omit(editingItemRef.current, ['ui'])
        )
      }
    }
  }, [formState.form.mutators])

  const addNewRow = (event, fields, fieldsPath, newItem) => {
    applyOrDiscardOrDelete(event)
    formState.form.mutators.push(fieldsPath, newItem)
    setEditingItem(() => {
      return {
        ...newItem,
        ui: {
          isNew: true,
          fieldsPath,
          index: fields.value?.length || 0
        }
      }
    })

    scrollIntoView()
  }

  const applyChanges = (event, index) => {
    if (editingItem) {
      if (!get(formState?.errors, editingItem.ui.fieldsPath.split('.'), false)) {
        exitEditMode()

        if (editingItem.ui.isNew) {
          scrollIntoView()
        }
      } else {
        const errorField = get(formState.errors, editingItem.ui.fieldsPath.split('.'), {})[index]

        // Mark all empty fields as `modified` in order to highlight the error if the field is invalid
        Object.entries(errorField.data).forEach(([fieldName]) => {
          formState.form.mutators.setFieldState(
            `${editingItem.ui.fieldsPath}[${index}].data.${fieldName}`,
            {
              modified: true
            }
          )
        })
      }
    }
  }

  const applyOrDiscardOrDelete = (event = null) => {
    if (editingItem) {
      if (!get(formState?.errors, editingItem.ui.fieldsPath, false)) {
        applyChanges(event, editingItem.ui.index)
      } else {
        discardOrDelete(event, editingItem.ui.fieldsPath, editingItem.ui.index)
      }
    }
  }

  const deleteRow = (event, fieldsPath, index) => {
    if (editingItem && index !== editingItem.ui.index) {
      applyOrDiscardOrDelete(event)
    }

    exitEditMode()

    const values = get(formState.values, fieldsPath)

    if (values?.length > 1) {
      formState.form.mutators.remove(fieldsPath, index)
    } else {
      formState.form.change(fieldsPath, [])
    }

    event && event.stopPropagation()
  }

  const discardChanges = (event, fieldsPath, index) => {
    exitEditMode()
    formState.form.mutators.update(fieldsPath, index, omit(editingItem, ['ui']))
    event && event.stopPropagation()
  }

  const discardOrDelete = (event, fieldsPath, index) => {
    if (!editingItem || editingItem?.ui?.isNew) {
      deleteRow(event, fieldsPath, index)
    } else {
      discardChanges(event, fieldsPath, index)
    }
  }

  const enterEditMode = (event, fields, fieldsPath, index) => {
    applyOrDiscardOrDelete(event)

    setTimeout(() => {
      const editItem = fields.value[index]

      setEditingItem(() => {
        return { ...editItem, ui: { fieldsPath, index } }
      })
    })
  }

  const exitEditMode = () => {
    setEditingItem(null)
  }

  const scrollIntoView = () => {
    if (bottomScrollRef.current) {
      setTimeout(() => {
        bottomScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }
  }

  const isCurrentRowEditing = (rowPath) => {
    return editingItem && `${editingItem.ui.fieldsPath}[${editingItem.ui.index}]` === rowPath
  }

  return {
    addNewRow,
    applyChanges,
    applyOrDiscardOrDelete,
    bottomScrollRef,
    deleteRow,
    discardChanges,
    discardOrDelete,
    editingItem,
    editingItemRef,
    enterEditMode,
    exitEditMode,
    isCurrentRowEditing
  }
}
