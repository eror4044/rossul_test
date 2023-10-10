import { useEffect, useState } from "react";
import { BillingForm } from "./form/billingForm";
import styles from "./home.module.scss";
import { Button } from "@mui/material";
import { IFormDataModel } from "../models/formDataModel";

export const Home = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formDataArray, setFormDataArray] = useState<IFormDataModel[]>([{
        id: 0,
        amount: "",
        account: [],
        payee: "",
        date: null,
        repeat: "",
        note: ""
    } as unknown as IFormDataModel]);

    useEffect(() => {
        checkFormIsValid();
    }, [formDataArray]);

    //sava or update values on form data array
    const saveFormData = (formData: IFormDataModel) => {
        const existingIndex = formDataArray.findIndex((item: IFormDataModel) => item.id === formData.id);
        if (existingIndex !== -1) {
            const updatedArray = [...formDataArray];
            updatedArray[existingIndex] = formData;
            setFormDataArray(updatedArray);
        } else {
            if (formDataArray.length > 1) {
                setFormDataArray([...formDataArray, formData]);
            }else{
                setFormDataArray([formData]);
            }
            
        }
        console.log('formDataArray', formDataArray);
    };

    const checkFormIsValid = () => {
        let isValid = true;
        formDataArray.forEach((data: IFormDataModel) => {
            if (
                !data.amount ||
                !data.account ||
                !data.payee ||
                !data.date ||
                !data.repeat ||
                !data.note
            ) {
                isValid = false;
            }
        });
        setFormIsValid(isValid);
    };

    const addForm = () => {
        if (formDataArray.length < 5) {
            setFormDataArray([...formDataArray, {} as IFormDataModel]);
        }
    };

    const removeForm = (idToRemove:number) => {                
        const updatedFormDataArray = formDataArray.filter((item) => item.id !== idToRemove);
        setFormDataArray(updatedFormDataArray);
    };

    return (
        <div className={styles.home_wrapper}>
            {formDataArray.map((item: IFormDataModel, index) => (
                <BillingForm canDelete={true} key={index} onSave={saveFormData} onRemove={removeForm} id={formDataArray.length - 1} />
            ))}
            <Button disabled={!formIsValid} onClick={addForm} variant="outlined" style={{ borderRadius: "20px" }}>
                + Add another bill
            </Button>
        </div>
    );
};
