import React, {useState, useEffect} from 'react'
import Input from '../Form/Input/Input'
import SelectInput from '../Form/Select/Select'
import Textarea from '../Form/Textarea/Textarea'
import './Modal.css'

export default function Modal(props) {

    const [data, setData] = useState()
    const [types, setTypes] = useState()
    const [sredstva, setSredstva] = useState()
    const [typesDefault, setTypesDefault] = useState()
    const [sredstvaDefault, setSredstvaDefault] = useState()
    const [info, setInfo] = useState()

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

    const onInfoChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }

    const onSelectChange = (e) => {
        setValues({
          ...values,
          [e.name]: e.value
        });
    }

    console.log(info);

    const onSubmitForm = async (e) => {
        console.log(values);
        e.preventDefault()
        try {
            await fetch(`http://localhost:8000/${props.editId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            await fetch(`http://localhost:8000/info/${props.editId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...info
                })
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

    const deleteItem = async () => {
        try {
            const response = await fetch(`http://localhost:8000/${props.editId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            })
            window.location = "/"
            props.closeModal()
        } catch (e) {
           console.error(e.message); 
        }
    }

    return (
        props.visible ? (
            <>
                <div 
                    className="modal-container" 
                    onClick={e=>(
                        e.target.className === 'modal-container' ? props.closeModal() : null
                    )}
                >
                    <div className="md-modal">
                        <div className="md-content">
                            <h2>Изменить информацию о позиции с QR номером: {props.editId}</h2>
                            <form onSubmit={e=>onSubmitForm(e)}>
                                <div className="form-inputs">
                                    <Input span="Введите номер QR кода" name="qr" value={data?.qr} onInputChange={onInputChange}/>
                                    <Input span="Введите наименование" name="name" value={data?.name} onInputChange={onInputChange} />
                                    {typesDefault ? 
                                        <SelectInput 
                                            span="Выберите тип"  
                                            name="type_id"
                                            data={types} 
                                            default={typesDefault}
                                            onSelectChange={onSelectChange} 
                                        /> : null}
                                    
                                    {sredstvaDefault ? 
                                        <SelectInput 
                                            span="Выберите средство" 
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
                                <Textarea  span="Информация о предмете" name="info" value={data?.info} onInputChange={onInfoChange} />
                                <div className="buttons">
                                    <input type="button" className="btn success" onClick={e=>onSubmitForm(e)} value="Сохранить" />
                                    <input type="button" className="btn warning" onClick={()=>deleteItem(data?.qr)} value="Удалить" />
                                </div>
                            </form>
                            <div className="close-btn" onClick={props.closeModal}>&times;</div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
        
    )
}
