import { useFocusStore } from '@/app/StateManagment'
import './SliderTabs.scss'

interface SliderTabsProps {
  mode: string
  setMode: (mode: string) => void
}

const modes = ['chats', 'messages']

const SliderTabs = ({ mode, setMode }: SliderTabsProps) => {
    const {triggerFocus}  = useFocusStore();
  
  const handleSliderClick = (item:string) => {
    setMode(item);
    triggerFocus()
  }

  console.log('mod', mode)
  return (
    <div className="sliderTabs__container">
    <div className="sliderTabs">
      <div
        className="sliderTabs__indicator"
        style={{
          transform: `translateX(${modes.indexOf(mode) * 100}%)`
        }}
      />

      {modes.map((item) => (
        <button 
          key={item}
          className={`sliderTabs__tab ${
            mode === item ? 'active' : ''
          }`}
          onClick={() => handleSliderClick(item)}
        >
          <p style={{textAlign:'center'}}>{item}</p>
        </button>
      ))}
    </div>
    </div>
  )
}

export default SliderTabs