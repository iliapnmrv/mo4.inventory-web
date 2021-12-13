const defaultState = {
    storages: [],
    statuses: [],
    sredstva: [],
    persons: [],
    types: [],
};

export const infoReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_STORAGES_DATA":
            return {...state,
                storages: payload.map((row) => ({
                    label: `${row.storage_id} - ${row.storage_name}`,
                    value: row.storage_id,
                }))
            };
        case "CHANGE_STATUSES_DATA":
            return {...state,
                statuses: payload.map((row) => ({
                    label: `${row.status_id} - ${row.status_name}`,
                    value: row.status_id,
                }))
            };
        case "CHANGE_SREDSTVA_DATA":
            return {...state,
                sredstva: payload.map((row) => ({
                    label: `${row.sredstvo_id} - ${row.sredstvo_name}`,
                    value: row.sredstvo_id,
                }))
            };
        case "CHANGE_PERSONS_DATA":
            return {...state,
                persons: payload.map((row) => ({
                    label: `${row.person_id} - ${row.person_name}`,
                    value: row.person_id,
                }))
            };
        case "CHANGE_TYPES_DATA":
            return {...state,
                types: payload.map((row) => ({
                    label: `${row.type_id} - ${row.type_name}`,
                    value: row.type_id,
                }))
            };
        default:
            return state;
    }
};