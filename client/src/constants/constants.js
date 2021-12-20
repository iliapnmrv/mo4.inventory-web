export const SERVER = "http://localhost:8000/"
    // export const SERVER = "http://mo4-it5:8000/"
export const LOGS_CATALOG = {
    qr: "QR",
    name: "Наименование по бухучету",
    sredstvo: "Средство",
    type: "Тип устройства",
    month: "Месяц ввода",
    year: "Год ввода",
    model: "Модель реальная",
    sernom: "Серийный номер",
    person: "МОЛ",
    storage: "Местоположение",
    status: "Статус",
    info: "Примечания",
}

export const ACCESS_RIGHTS = {
    admin: {
        qr: true,
        name: false,
        sredstvo: false,
        type: false,
        month: false,
        year: false,
        model: false,
        sernom: false,
        info: false,
        status: false,
        person: false,
        storage: false,
    },
    user: {
        qr: true,
        name: true,
        sredstvo: true,
        type: true,
        month: true,
        year: true,
        model: true,
        sernom: true,
        info: false,
        status: true,
        person: true,
        storage: false,
    }
}

export const DIALOGS = {
    delete: {
        header: "Вы уверены, что хотите удалить позицию?",
        confirmButton: "Да, удалить",
        cancelButton: "Отменить",
    },
    save: {
        header: "Вы уверены, что хотите выйти без сохранения?",
        confirmButton: "Да, сохранить",
        cancelButton: "Не сохранять",
    }
}