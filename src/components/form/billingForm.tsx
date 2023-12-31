import { Button, FormControl, FormHelperText, Icon, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from "@mui/material"
import styles from './billingForm.module.scss'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from "react"
import { SvgIcon } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IFormDataModel } from "../../models/formDataModel"

export interface IBillingForm {
    onSave:any
    onRemove:any
    setFormIsValid:any
    id:number
    canDelete:boolean
}

export const BillingForm = (props:IBillingForm) =>{
    const [noteSymbolsCount, setNoteSymbolsCount] = useState('');

    const [formData, setFormData] = useState({
        id:props.id,
        amount: "",
        account: [],
        payee: "",
        date: null,
        repeat: "",
        note: "",
    });

    const handleNoteSymbolsChange = (event:any) => {
        setNoteSymbolsCount(event.target.value.length);
    }

    const checkFormIsValid = (formData:any) => {
        let isValid = true;
        if (
            !formData.amount ||
            !formData.account ||
            !formData.payee ||
            !formData.date ||
            !formData.repeat ||
            !formData.note
        ) {
            isValid = false;
        }
        return isValid
    };

    const handleFieldChange = (name:string, event:any) => {
        let valueToUpdate = event.target?.value;
      
        if (name === "note") {
          handleNoteSymbolsChange(event);
        } 
        if (name === "date") {
          valueToUpdate = event._d.toString();
        }
        if (name === "account" && valueToUpdate?.length >= 3) {
            return
        }
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: valueToUpdate,
        }));
        if (
            checkFormIsValid(formData)
        ) {
            props.setFormIsValid(true)
            props.onSave(formData);
        }
    };

    return(
        <form className={styles.form_container}>
            <Button disabled={!props.canDelete} className={styles.del_btn} onClick={() => props.onRemove(props.id)}>
                x
            </Button>
            <FormControl id="amount">
                <TextField
                    label="Amount"
                    id="amount"
                    variant="standard"
                    defaultValue={'0'}
                    onChange={(e: any) => handleFieldChange("amount", e)}
                    error={formData.amount.length < 1}
                    helperText={formData.amount.length < 1 ? "Please add value" : ""}
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                    }} />
            </FormControl>
            <Stack width={'100%'} direction="row" spacing={2}>
                <FormControl fullWidth error={formData.account.length === 0}>
                    <InputLabel id="account_label">From Account</InputLabel>
                    <Select
                        id="account"
                        labelId="account_label"
                        label="Outlined"
                        multiple
                        value={formData.account}
                        onChange={(e: any) => handleFieldChange("account", e)}
                    >
                        <MenuItem value={'My Checking Account $12000'}>My Checking Account $12000</MenuItem>
                        <MenuItem value={'Second Checking Account $12000'}>Second Checking Account $12000</MenuItem>
                        <MenuItem value={'Last Checking Account $12000'}>Last Checking Account $12000</MenuItem>
                    </Select>
                    {formData.account.length === 0 && <FormHelperText>Please select an account</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={formData.payee.length === 0}>
                    <InputLabel id="payee_label">Payee</InputLabel>
                    <Select
                        id="payee"
                        labelId="payee_label"
                        label="Outlined"
                        onChange={(e: any) => handleFieldChange("payee", e)}
                        value={formData.payee}
                    >
                        <MenuItem value={'London Hydro'}>London Hydro</MenuItem>
                        <MenuItem value={'ISsoft Ukraine'}>ISsoft Ukraine</MenuItem>
                        <MenuItem value={'GlobalLogic Ukraine'}>GlobalLogic Ukraine</MenuItem>
                    </Select>
                    {formData.payee.length === 0 && <FormHelperText>Please select a payee</FormHelperText>}
                </FormControl>
            </Stack>
            <Stack width={'100%'} direction="row" spacing={2}>
                <FormControl fullWidth error={formData.date === null}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Date"
                            onChange={(e: any) => handleFieldChange("date", e)} />
                    </LocalizationProvider>
                    {formData.date === null && <FormHelperText>Please select a date</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={formData.repeat.length === 0}>
                    <InputLabel id="repeat_label">Repeat</InputLabel>
                    <Select
                        id="repeat"
                        labelId="repeat_label"
                        label="Outlined"
                        onChange={(e: any) => handleFieldChange("repeat", e)}
                        style={{ width: '100%' }}
                        value={formData.repeat}
                    >
                        <MenuItem value={'Every 1 Month, Until Oct 12, 2023'}>Every 1 Month, Until Oct 12, 2023</MenuItem>
                        <MenuItem value={'Every 2 Month, Until Oct 12, 2023'}>Every 2 Month, Until Oct 12, 2023</MenuItem>
                        <MenuItem value={'Every 3 Month, Until Oct 12, 2023'}>Every 3 Month, Until Oct 12, 2023</MenuItem>
                    </Select>
                    {formData.repeat.length === 0 && <FormHelperText>Please select a repeat option</FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="note">Note</InputLabel>
                    <OutlinedInput onChange={(e: any) => { handleFieldChange("note", e) } } required={true} inputProps={{ maxLength: 31 }} label="Outlined" id="note" />
                    <FormHelperText style={{ textAlign: 'right' }} id="note-helper-text">{noteSymbolsCount}/31</FormHelperText>
                </FormControl>
            </Stack>
        </form>
        
    )
}