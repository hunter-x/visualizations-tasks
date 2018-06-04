export const BORDERSELECTIONCHECCKBOX = "BORDERSELECTIONCHECCKBOX";
export const TREATMENTSELECTIONCHECCKBOX = "TREATMENTSELECTIONCHECCKBOX";
export const DATESELECTIONMENU = "DATESELECTIONMENU";

/* define the show|hide component for the delimitation in aaron maps to  */
export function getBorderSelection(checkboxesObject) {
    return {
        type: BORDERSELECTIONCHECCKBOX,
        payload: checkboxesObject
    };
}

/* define the show|hide component for the treatment checkboxes (gratitude,intentions,social) in aaron maps to  */
export function getTreatmentSelection(checkboxesObject) {
    console.log('aaaaaaccction', checkboxesObject);
    return {
        type: TREATMENTSELECTIONCHECCKBOX,
        payload: checkboxesObject
    };
}

/* define the change of the date menu in aaron map of distribution followup  */
export function getSelectedDate(checkboxesObject) {
    console.log('Date CHanged on t', checkboxesObject);
    return {
        type: DATESELECTIONMENU,
        payload: checkboxesObject
    };
}