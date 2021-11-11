import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect} from 'react'
import './Form.css'
import Input from './Input/Input'
import SelectInput from './Select/Select'
import useFetch from '../../hooks/useFetch'
import usePostFetch from '../../hooks/usePostFetch'
import useForm from '../../hooks/useForm'


export default function CreateItem(props) {

    const [open, setOpen] = useState(false)
    const [types, setTypes] = useState([])
    const [sredstva, setSredstva] = useState([])
    const [statuses, setStatuses] = useState([])

    const {values: {qr, name, sredstvo, type_id, month, year, model, sernom, info, status}, changeHandler, selectChangeHandler} = useForm({
        qr: "",
        name: "",
        sredstvo: "",
        type_id: '',
        month: "",
        year: "",
        model: "",
        sernom: "",
        info: "",
        status:"",
    })
    
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
                body: JSON.stringify({qr, name, sredstvo, type_id, month, year, model, sernom})
            })
            await fetch(`http://localhost:8000/api/info/${qr}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({info})
            })
            await fetch(`http://localhost:8000/api/status/${qr}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status})
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
            <form  className="form"  onSubmit={(e)=>onSubmitForm(e)} >
                <div className="form-inputs">
                    <SelectInput 
                        span="Выберите тип устройства"  
                        name="type_id"
                        data={types} 
                        onSelectChange={selectChangeHandler} 
                    />
                    <SelectInput 
                        span="Выберите средство устройства" 
                        name="sredstvo" 
                        data={sredstva} 
                        onSelectChange={selectChangeHandler} 
                    />
                    <SelectInput 
                        span="Выберите статус" 
                        name="status" 
                        data={statuses} 
                        onSelectChange={selectChangeHandler} 
                    />
                </div>
                <div className="form-inputs">
                    <Input 
                        span="Введите номер QR кода" 
                        name="qr" 
                        type="number" 
                        value={qr} 
                        onChange={changeHandler} 
                    />
                    <Input 
                        span="Введите наименование" 
                        name="name" 
                        value={name} 
                        onChange={changeHandler} 
                    />
                
                    <Input 
                        span="Месяц ввода"
                        type="number" 
                        name="month" 
                        value={month} 
                        onChange={changeHandler} 
                    />
                </div>
                <div className="form-inputs">
                    <Input 
                        span="Год ввода в эксплуатацию"
                        type="number" 
                        name="year" 
                        value={year} 
                        onChange={changeHandler} 
                    />
                    <Input 
                        span="Модель"
                        name="model" 
                        value={model} 
                        onChange={changeHandler} 
                    />
                    <Input 
                        span="Серийный номер"
                        name="sernom" 
                        value={sernom} 
                        onChange={changeHandler} 
                    />
                </div>
                <div className="form-inputs">
                    <Input 
                        span="Информация о предмете"
                        name="info" 
                        value={info} 
                        onChange={changeHandler} 
                    />
                </div>
                <button className="btn success" type="submit" >Добавить</button>
            </form> 
        </div>
    )
}
