import React, {useState, useEffect} from 'react'
import Input from '../Form/Input/Input'
import SelectInput from '../Form/Select/Select'
import './Modal.css'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'

export default function Modal(props) {

    const [data, setData] = useState()   
    const [types, setTypes] = useState()
    const [sredstva, setSredstva] = useState()
    const [statuses, setStatuses] = useState()
    const [typesDefault, setTypesDefault] = useState()
    const [sredstvaDefault, setSredstvaDefault] = useState()
    const [statusesDefault, setStatusesDefault] = useState()
    
    const {values: {qr, name, sredstvo, type_id, month, year, model, sernom, info, status}, changeHandler, selectChangeHandler, setDefault} = useForm({
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


    const { data: fetchTypes, isPending: isPendingTypes } = useFetch('http://localhost:8000/api/types')
    const { data: fetchSredstva, isPending: isPendingSredstva } = useFetch('http://localhost:8000/api/sredstva')
    const { data: fetchStatuses, isPending: isPendingStatuses } = useFetch('http://localhost:8000/api/statuses')

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

    const getDefault = async(value, obj, name) => {
        var itemId = `${name}_id`
        var itemName = `${name}_name`
        let res 
        obj.forEach(elem => {
            if (elem[itemId] === value) {
                res = {
                    label: `${value} - ${elem[itemName]}`,
                    value: value
                }
                return
            }
        });
        console.log(res);
        return res
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:8000/api/total/${props.editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({qr, name, sredstvo, type_id, month, year, model, sernom})
            })
            await fetch(`http://localhost:8000/api/info/${props.editId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({info})
            })
            await fetch(`http://localhost:8000/api/status/${props.editId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({status})
            })
            window.location = "/"
        } catch (e) {
            console.error(e.message);
        }
    }

    const getData = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/total/${props.editId}`)
            const jsonData = await response.json()
            setDefault(...jsonData)
            getDefault(jsonData[0].type_id, fetchTypes, 'type')
            .then(res=>setTypesDefault(res))
            getDefault(jsonData[0].sredstvo, fetchSredstva, 'sredstvo')
            .then(res=>setSredstvaDefault(res))
            if (jsonData[0].status) {
                getDefault(jsonData[0].status, fetchStatuses, 'status')
                    .then(res=>setStatusesDefault(res))
            }
           
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(() => {
        setStatusesDefault('')
        setSredstvaDefault('')
        setTypesDefault('')
        getData()
    }, [props.open])

    const deleteItem = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/total/${props.editId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
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
                                </div>
                                <div className="form-inputs">
                                    {typesDefault ? 
                                        <SelectInput 
                                            span="Выберите тип"  
                                            name="type_id"
                                            data={types} 
                                            default={typesDefault}
                                            onSelectChange={selectChangeHandler} 
                                        /> : null}
                                    
                                    {sredstvaDefault ? 
                                        <SelectInput 
                                            span="Выберите средство" 
                                            name="sredstvo" 
                                            data={sredstva} 
                                            default={sredstvaDefault}
                                            onSelectChange={selectChangeHandler} 
                                        /> : null}
                                    {statusesDefault ? 
                                        <SelectInput 
                                            span="Выберите статус" 
                                            name="status" 
                                            data={statuses} 
                                            default={statusesDefault}
                                            onSelectChange={selectChangeHandler} 
                                        /> : null}
                                </div>
                                <div className="form-inputs">
                                    <Input 
                                        span="Месяц ввода"
                                        type="number" 
                                        name="month" 
                                        value={month} 
                                        onChange={changeHandler} 
                                    />
                                     <Input 
                                        span="Год ввода в эксплуатацию"
                                        type="number" 
                                        name="year" 
                                        value={year} 
                                        onChange={changeHandler} 
                                    />
                                </div>
                                <div className="form-inputs">
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
                                <Input 
                                    span="Информация о предмете"
                                    name="info" 
                                    value={info} 
                                    onChange={changeHandler} 
                                />
                                <div className="buttons">
                                    <input type="submit" className="btn success" onClick={e=>onSubmitForm(e)} value="Сохранить" />
                                    <input type="button" className="btn warning" onClick={()=>deleteItem(qr)} value="Удалить" />
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
