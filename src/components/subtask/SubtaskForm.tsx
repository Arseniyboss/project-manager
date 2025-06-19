import { FaCircleCheck } from 'react-icons/fa6'
import { isMobile } from 'react-device-detect'
import { KeyboardEvent, useState, useRef, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useAutoResizeTextArea } from '@/hooks/useAutosizeTextArea'
import { useSubtaskContext } from '@/hooks/useSubtaskContext'
import { CardBody } from '@/components/task/styles'
import { Button } from '@/styles'
import { SubtaskCard, CheckboxWrapper } from './styles'

type Props = {
  taskId: string
}

const SubtaskForm = ({ taskId }: Props) => {
  const [title, setTitle] = useState<string>('')

  const subtaskRef = useRef<HTMLLIElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { themeStyles } = useTheme()
  const { isAdding, setIsAdding, addSubtask } = useSubtaskContext()

  useOnClickOutside(subtaskRef, () => setIsAdding(false))
  useAutoResizeTextArea(textareaRef, title)

  useEffect(() => {
    if (isAdding) {
      textareaRef.current?.focus()
    }
  }, [isAdding])

  const handleAddSubtask = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    addSubtask(taskId, trimmedTitle)
    setIsAdding(false)
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (isMobile || e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    handleAddSubtask()
  }
  return (
    <SubtaskCard ref={subtaskRef} $themeStyles={themeStyles}>
      <CardBody>
        <CheckboxWrapper>
          <input type="checkbox" disabled />
        </CheckboxWrapper>
        <textarea
          value={title}
          ref={textareaRef}
          rows={1}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleEnter}
          data-testid="add-subtask-input"
        />
        <Button
          onClick={handleAddSubtask}
          aria-label="add subtask"
          data-testid="add-subtask-button"
        >
          <FaCircleCheck size={19} />
        </Button>
      </CardBody>
    </SubtaskCard>
  )
}

export default SubtaskForm
