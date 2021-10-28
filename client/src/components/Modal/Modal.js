import React, {useState, useEffect} from 'react'
import Input from '../Form/Input/Input'
import SelectInput from '../Form/Select/Select'
import './Modal.css'

export default function Modal(props) {

    const [data, setData] = useState()
    const [types, setTypes] = useState()
    const [sredstva, setSredstva] = useState()
    const [typesDefault, setTypesDefault] = useState()
    const [sredstvaDefault, setSredstvaDefault] = useState()

    const getTypes = async (type) => {
        try {
            const response = await fetch("http://localhost:8000/types")
            const jsonData = await response.json()
            setTypes(jsonData.map(row => ({ 
                label: `${row.type_id} - ${row.type_name}`,
                value: row.type_id
            })))
            for (const i in jsonData) {
                if (jsonData[i].type_id === type) {
                    setTypesDefault({
                        label: `${type} - ${jsonData[i].type_name}`,
                        value: type
                    })
                }
            }
        } catch (e) {
           console.error(e.message); 
        }
    } 

    const getSredstva = async (sredstvo) => {
        try {
            const response = await fetch("http://localhost:8000/sredstva")
            const jsonData = await response.json()
            setSredstva(jsonData.map(row => ({ 
                label: `${row.sredstvo_id} - ${row.sredstvo_name}`,
                value: row.sredstvo_id
            })))
            for (const i in jsonData) {
                if (jsonData[i].sredstvo_id === sredstvo) {
                    setSredstvaDefault({
                        label: `${sredstvo} - ${jsonData[i].sredstvo_name}`,
                        value: sredstvo
                    })
                }
            }
        } catch (e) {
           console.error(e.message); 
        }
    } 

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
        console.log(values);
        e.preventDefault()
        try {
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

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/${props.editId}`)
            const jsonData = await response.json()
            setData(...jsonData)
            setValues(...jsonData)
            getTypes(jsonData[0].type_id)
            getSredstva(jsonData[0].sredstvo)
        } catch (e) {
           console.error(e.message); 
        }
    }

    useEffect(() => {
        getData()
    }, [props.visible])
    

    return (
        props.visible ? (
            <>
                <div className="modal-container">
                    <div className="md-modal">
                        <div className="md-content">
                            <h2>Изменить информацию о позиции с QR номером: {props.editId}</h2>
                            <form onSubmit={onSubmitForm}>
                                <div className="form-inputs">
                                    <Input span="Введите номер QR кода" name="qr" value={data?.qr} onInputChange={onInputChange}/>
                                    <Input span="Введите наименование" name="name" value={data?.name} onInputChange={onInputChange} />
                                    {typesDefault ? 
                                        <SelectInput 
                                            span="Выберите тип устройства"  
                                            name="type_id"
                                            data={types} 
                                            default={typesDefault}
                                            onSelectChange={onSelectChange} 
                                        /> : null}
                                    
                                    {sredstvaDefault ? 
                                        <SelectInput 
                                            span="Выберите средство устройства" 
                                            name="sredstvo" 
                                            data={sredstva} 
                                            default={sredstvaDefault}
                                            onSelectChange={onSelectChange} 
                                        /> : null}
                                </div>
                                <div className="form-inputs">
                                    <Input span="Месяц ввода" name="month" value={data?.month} onInputChange={onInputChange} />
                                    <Input span="Год ввода в эксплуатацию" name="year" value={data?.year} onInputChange={onInputChange} />
                                </div>
                                <div className="form-inputs">
                                    <Input span="Модель" name="model" value={data?.model} onInputChange={onInputChange} />
                                    <Input span="Серийный номер" name="sernom" value={data?.sernom} onInputChange={onInputChange} />
                                </div>
                                <input type="submit" className="btn success" onClick={props.closeModal} value="Сохранить" />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        ) : null
        
    )
}
