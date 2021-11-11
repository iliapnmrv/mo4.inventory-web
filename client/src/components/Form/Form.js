import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect} from 'react'
import './Form.css'
import Input from './Input/Input'
import SelectInput from './Select/Select'
import Textarea from './Textarea/Textarea'
import useFetch from '../../hooks/useFetch'
import usePostFetch from '../../hooks/usePostFetch'
import useForm from '../../hooks/useForm'




export default function CreateItem(props) {

    const [open, setOpen] = useState(false)
    const [types, setTypes] = useState([])
    const [sredstva, setSredstva] = useState([])
    const [statuses, setStatuses] = useState([])
    const [info, setInfo] = useState()
    const [status, setStatus] = useState()

    const {values, changeHandler} = useForm({
        qr: "",
        name: "",
        sredstvo: "",
        type_id: '',
        month: "",
        year: "",
        model: "",
        sernom: "",
    })

    console.log(values);
    
    const {data: fetchTypes, isPending: isPendingTypes} = useFetch('http://localhost:8000/api/types')
    const {data: fetchSredstva, isPending: isPendingSredstva} = useFetch('http://localhost:8000/api/sredstva')
    const {data: fetchStatuses, isPending: isPendingStatuses} = useFetch('http://localhost:8000/api/statuses')

    useEffect(() => {
        setTypes(fetchTypes.map(row => ({
            label: `${row.type_id} - ${row.type_name}`,
            value: row.type_id
        })))
        setSredstva(fetchSredstva.map(row => ({
            label: `${row.sredstvo_id} - ${row.sredstvo_name}`,
            value: row.sredstvo_id
        })))
        setStatuses(fetchStatuses.map(row => ({
            label: `${row.status_id} - ${row.status_name}`,
            value: row.status_id
        })))
    }, [fetchTypes, fetchSredstva, fetchStatuses])

   
    const onInputChange = (e) => {
        // setValues({
        //   ...values,
        //   [e.target.name]: e.target.value
        // });
    }

    const onInfoChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }
  
    const onStatusChange = (e) => {
        setStatus({
            ...status,
            [e.name]: e.value
        });
    }

    const onSelectChange = (e) => {
        // setValues({
        //   ...values,
        //   [e.name]: e.value
        // });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            // const {message : newItemMessage, isSuccess : newItemSuccess} = usePostFetch('http://localhost:8000/api/total/', values)
            // const {message : newInfoMessage, isSuccess : newInfoSuccess} = usePostFetch(
            //     `http://localhost:8000/api/info/${values.qr}`, 
            //     {...info})

            await fetch("http://localhost:8000/api/total/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            await fetch(`http://localhost:8000/api/info/${values.qr}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...info
                })
            })
            await fetch(`http://localhost:8000/api/status/${values.qr}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...status
                })
            })
            window.location = "/"
        } catch (e) {
            console.error(e.message);
        }
    }

    const toggleForm = () => {
        document.querySelector('.form').classList.toggle('slide')
        setOpen(!open)
    }

    return (
        <div>
            <div className="header"  onClick={()=>{toggleForm()}}>
                <h2>Добавить новый элемент</h2>
                <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp}/>
            </div>
            <form  className="form" onSubmit={(e)=>onSubmitForm(e)}>
                <div className="form-inputs">
                    <label className='form-item'>
                        <span>Введите номер QR кода</span>
                        <input 
                            type="text"
                            id="qr"
                            value={values.qr}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Введите наименование</span>
                        <input 
                            type="text"
                            id="name"
                            value={values.name}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Месяц ввода</span>
                        <input 
                            type="text"
                            id="month"
                            value={values.month}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Год ввода в эксплуатацию</span>
                        <input 
                            type="text"
                            id="year"
                            value={values.year}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Модель</span>
                        <input 
                            type="text"
                            id="model"
                            value={values.model}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Серийный номер</span>
                        <input 
                            type="text"
                            id="model"
                            value={values.sernom}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <label className='form-item'>
                        <span>Информация о предмете</span>
                        <textarea 
                            type="text"
                            id="info"
                            value={values.info}
                            onChange={e=>changeHandler(e)}
                        />
                    </label>
                    <SelectInput 
                        span="Выберите тип устройства"  
                        name="type_id"
                        data={types} 
                        onSelectChange={onSelectChange} 
                    />
                    <SelectInput 
                        span="Выберите средство устройства" 
                        name="sredstvo" 
                        data={sredstva} 
                        onSelectChange={onSelectChange} 
                    />
                    <SelectInput 
                        span="Выберите статус" 
                        name="status" 
                        data={statuses} 
                        onSelectChange={onStatusChange} 
                    />
                </div>
                <button className="btn success" >Добавить</button>
            </form> 
        </div>
    )
}
