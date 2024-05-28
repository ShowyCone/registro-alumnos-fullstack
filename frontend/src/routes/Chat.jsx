import '../styles/chat.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'
import { BiSend } from 'react-icons/bi'
import axios from 'axios'

const Chat = () => {
  const { allData, setAllData } = useContext(GlobalDataContext)
  const [currentMessage, setCurrentMessage] = useState({
    bot: '',
    estudiante: '',
  })
  const [sendedMessage, setSendedMessage] = useState('')
  const [response, setResponse] = useState('')
  const [materiaSelected, setMateriaSelected] = useState(1) // id
  const [notasSelected, setNotasSelected] = useState([])
  const [notasIsFilled, setNotasIsFilled] = useState(true)

  const handleMessageChange = (value) => {
    setCurrentMessage((current) => {
      return {
        ...current,
        estudiante: value,
      }
    })
  }

  const sendMessageChange = () => {
    setSendedMessage(currentMessage.estudiante)
  }

  useEffect(() => {
    if (notasIsFilled) {
      if (sendedMessage === '1') {
        setResponse([notasSelected[0], notasSelected[1], notasSelected[2]])
      } else if (sendedMessage === '2') {
        setResponse(notasSelected[3])
      }
    }
  }, [sendedMessage])

  useEffect(() => {
    const welcome = `Bienvenido!`
    const options = `
    Selecciona una opción:
    1: Notas de los lapsos
    2: Promedio general
    `
    const message = welcome + options
    setCurrentMessage((current) => {
      return {
        ...current,
        bot: message,
      }
    })
  }, [allData])

  const yearNames = {
    1: '3ero',
    2: '4to',
    3: '5to',
  }

  useEffect(() => {
    axios
      .get(
        `https://registro-alumnos-fullstack.onrender.com/api/estudiante/${allData[0].id_estudiante}/materia/${materiaSelected}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setNotasIsFilled(false)
        } else {
          setNotasIsFilled(true)
          setNotasSelected([
            response.data[0].nota1,
            response.data[0].nota2,
            response.data[0].nota3,
            response.data[0].promedio,
          ])
        }
      })
  }, [materiaSelected])

  const handleMateriaSelected = (id) => {
    setMateriaSelected(id)
    setSendedMessage('')
    setResponse('')
  }

  return (
    <div className='chat-container'>
      <div className='user-list'>
        <div className='user'>
          <h3>Año Escolar: {yearNames[allData[0].id_año] || '?'}</h3>
        </div>
        <div className='user'>
          <h4>{''}</h4>
        </div>
        <div
          className={`user ${materiaSelected === '1' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('1')}
        >
          Química
        </div>
        <div
          className={`user ${materiaSelected === '2' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('2')}
        >
          Matemáticas
        </div>
        <div
          className={`user ${materiaSelected === '3' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('3')}
        >
          Castellano
        </div>
        <div
          className={`user ${materiaSelected === '4' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('4')}
        >
          Física
        </div>
        <div
          className={`user ${materiaSelected === '5' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('5')}
        >
          Biología
        </div>
        <div
          className={`user ${materiaSelected === '6' ? 'selected' : ''}`}
          onClick={() => handleMateriaSelected('6')}
        >
          Inglés
        </div>
      </div>
      <div className='chat-box'>
        <div className='chat-header'> </div>
        <div className='chat-messages' style={{ whiteSpace: 'pre-wrap' }}>
          {currentMessage.bot}
          <br />
          <br />
          {sendedMessage}
          <br />
          <br />
          {sendedMessage === '1' ? (
            notasIsFilled ? (
              <h3>
                Lapso 1: {response[0]}pts
                <br />
                Lapso 2: {response[1]}pts
                <br />
                Lapso 3: {response[2]}pts
              </h3>
            ) : (
              <h3>Notas no han sido cargadas</h3>
            )
          ) : sendedMessage === '2' ? (
            <h3>Promedio: {response}pts</h3>
          ) : (
            <></>
          )}
        </div>
        <div className='message-control'>
          <input
            type='text'
            className='chat-input'
            placeholder='Escribe un mensaje...'
            onChange={(e) => handleMessageChange(e.target.value)}
          />
          <button
            type='button'
            className='send-message'
            onClick={sendMessageChange}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
