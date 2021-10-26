import React, {useState} from 'react'
import './Form.css'
import Input from './Input/Input'
import SelectInput from './Select/Select'

export default function CreateItem(props) {

    const [values, setValues] = useState({
        qr: "",
        name: "",
        sredstvo: null,
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

    return (
        <div>
            <h2 onClick={()=>{}}>Добавить новый элемент</h2>
            <form onSubmit={onSubmitForm}>
                <div className="form-inputs">
                    <Input span="Введите номер QR кода" name="qr" width="20" onInputChange={onInputChange}/>
                    <Input span="Введите наименование" name="name" width="50" onInputChange={onInputChange} />
                    <SelectInput span="Выберите средство" name="sredstvo" onSelectChange={onSelectChange} />
                </div>
                <div className="form-inputs">
                    <Input span="Месяц ввода" name="month" width="20" onInputChange={onInputChange} />
                    <Input span="Год ввода в эксплуатацию" name="year" width="10" onInputChange={onInputChange} />
                </div>
                <div className="form-inputs">
                    <Input span="Модель" name="model" width="40" onInputChange={onInputChange} />
                    <Input span="Серийный номер" name="sernom" width="40" onInputChange={onInputChange} />
                </div>
                <button className="btn success" >Добавить</button>
            </form> 
        </div>
    )
}
