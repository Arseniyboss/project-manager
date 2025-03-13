import { KeyboardEvent, useRef, useState } from 'react'
import { DraggableProvided } from '@hello-pangea/dnd'
import { FaCheck, FaTrashAlt } from 'react-icons/fa'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'
import { useTheme } from '@/hooks/useTheme'
import { useAutoResizeTextArea } from '@/hooks/useAutosizeTextArea'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { Subtask as SubtaskProps } from '@/types/subtask'
import { Button } from '@/styles'
import { CardBody } from '@/components/task/styles'
import { SubtaskCard, CheckboxWrapper, CheckmarkContainer } from './styles'

type Props = SubtaskProps & DraggableProvided

const Subtask = (props: Props) => {
  const { id, title, checked, dragHandleProps, draggableProps, innerRef } = props

  const [subtask, setSubtask] = useState<string>(title)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { themeStyles } = useTheme()
  const { deleteSubtask, editSubtask, toggleSubtask, setIsSubtaskHovered } =
    useSubtaskContext()

  useAutoResizeTextArea(textareaRef, subtask)

  useUpdateEffect(() => {
    const trimmedSubtask = subtask.trim()
    if (!trimmedSubtask) return
    editSubtask(id, trimmedSubtask)
  }, [subtask])

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    toggleSubtask(id)
  }

  const handleDelete = () => {
    deleteSubtask(id)
    setIsSubtaskHovered(false)
  }
  return (
    <SubtaskCard
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      $themeStyles={themeStyles}
      onMouseEnter={() => setIsSubtaskHovered(true)}
      onMouseLeave={() => setIsSubtaskHovered(false)}
      data-testid="subtask"
    >
      <CardBody>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            checked={checked}
            onChange={() => toggleSubtask(id)}
            data-testid="subtask-checkbox-input"
          />
          <CheckmarkContainer
            role="checkbox"
            htmlFor={`checkbox-${id}`}
            aria-label={`Mark subtask ${title} as ${checked ? 'unchecked' : 'checked'}`}
            aria-checked={checked}
            tabIndex={0}
            data-testid="subtask-checkbox"
            onKeyDown={handleKeyDown}
          >
            <FaCheck />
          </CheckmarkContainer>
        </CheckboxWrapper>
        <textarea
          value={subtask}
          ref={textareaRef}
          rows={1}
          onChange={(e) => setSubtask(e.target.value)}
          aria-label="edit subtask input"
          data-testid="edit-subtask-input"
        />
        <Button
          onClick={handleDelete}
          aria-label="delete subtask"
          data-testid="delete-subtask-button"
        >
          <FaTrashAlt size={19} />
        </Button>
      </CardBody>
    </SubtaskCard>
  )
}

export default Subtask
