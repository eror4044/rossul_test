import { useEffect, useState } from "react";
import { BillingForm } from "./form/billingForm";
import styles from "./home.module.scss";
import { Button, Stack } from "@mui/material";
import { IFormDataModel } from "../models/formDataModel";

export const Home = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formDataArray, setFormDataArray] = useState<IFormDataModel[]>([{id:1} as IFormDataModel]);

    useEffect(() => {
        //show form data
        console.log('formDataArray', formDataArray);
    }, [formDataArray]);
    
    //sava or update values on form data array
    const saveFormData = (formData: IFormDataModel) => {
        const existingIndex = formDataArray.findIndex((item: IFormDataModel) => item.id === formData.id);
        if (existingIndex !== -1) {
            let updatedFormDataArray:Array<IFormDataModel> = formDataArray
            updatedFormDataArray[existingIndex] = formData
            setFormDataArray(updatedFormDataArray);
        }else{
            setFormDataArray([...formDataArray, {id:formDataArray.length + 1} as IFormDataModel]);
        }
    };

    const addForm = () => {
        if (formDataArray.length < 5) {
            setFormDataArray([...formDataArray, {id:formDataArray.length + 1} as IFormDataModel]);
        }
    };

    const removeForm = (idToRemove:number) => {                
        const updatedFormDataArray = formDataArray.filter((item) => item.id !== idToRemove);
        setFormDataArray(updatedFormDataArray);
    };

    return (
        <Stack spacing={2} direction={'column'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
            {formDataArray.map((item: IFormDataModel, index) => (
                <BillingForm canDelete={formDataArray.length > 1} key={index} onSave={saveFormData} setFormIsValid={setFormIsValid} onRemove={removeForm} id={formDataArray.length} />
            ))}
            <Button disabled={!formIsValid || !(formDataArray.length < 5)} onClick={addForm} variant="outlined" style={{ borderRadius: "20px" }}>
                + Add another bill
            </Button>
        </Stack>
    );
};
