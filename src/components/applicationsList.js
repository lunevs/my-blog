import React from 'react';
import { Button } from "react-bootstrap";
import applicationService from '../services/applications'
import {useParams} from "react-router-dom";

const ApplicationsList = () => {

    const id = useParams().id

    const getApplications = async () => {
        const row = await applicationService.getAll()
        const f_row = row.filter(el => el.event.id === id)
        console.log("original: ", row)
        console.log("filtered: ", f_row)
    }

    return (
        <div className='pageBody'>
            <Button onClick={getApplications}>get applications</Button>
        </div>
    )
}

export default ApplicationsList
