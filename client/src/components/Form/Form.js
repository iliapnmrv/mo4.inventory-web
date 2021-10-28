import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect} from 'react'
import './Form.css'
import Input from './Input/Input'
import SelectInput from './Select/Select'


export default function CreateItem(props) {

    const [open, setOpen] = useState(false)
    const [types, setTypes] = useState()
    const [sredstva, setSredstva] = useState()

    const getTypes = async () => {
        try {
            const response = await fetch("http://localhost:8000/types")
            const jsonData = await response.json()
            setTypes(jsonData.map(row => ({ 
                label: `${row.type_id} - ${row.type_name}`,
                value: row.type_id
            })))
        } catch (e) {
           console.error(e.message); 
        }
    } 

    const getSredstva = async () => {
        try {
            const response = await fetch("http://localhost:8000/sredstva")
            const jsonData = await response.json()
            setSredstva(jsonData.map(row => ({ 
                label: `${row.sredstvo_id} - ${row.sredstvo_name}`,
                value: row.sredstvo_id
            })))
        } catch (e) {
           console.error(e.message); 
        }
    } 

    useEffect(() => {
        getTypes()
        getSredstva()
    }, [])

    const [values, setValues] = useState({
        qr: "",
        name: "",
        sredstvo: "",
        type_id: '',
        month: "",
        year: "",
        model: "",
        sernom: "",
    })

    const onInputChange = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.value
        });
    }

    const onSelectChange = (e) => {
        setValues({
          ...values,
          [e.name]: e.value
        });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            console.log(values);
            const response = await fetch("http://localhost:8000/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
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
            <form onSubmit={onSubmitForm}>
                <div className="form">
                    <div className="form-inputs">
                        <Input span="Введите номер QR кода" name="qr" onInputChange={onInputChange}/>
                        <Input span="Введите наименование" name="name" onInputChange={onInputChange} />
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
                    </div>
                    <div className="form-inputs">
                        <Input span="Месяц ввода" name="month" onInputChange={onInputChange} />
                        <Input span="Год ввода в эксплуатацию" name="year" onInputChange={onInputChange} />
                    </div>
                    <div className="form-inputs">
                        <Input span="Модель" name="model" onInputChange={onInputChange} />
                        <Input span="Серийный номер" name="sernom" onInputChange={onInputChange} />
                    </div>
                    <button className="btn success" >Добавить</button>
                </div>
            </form> 
        </div>
    )
}
