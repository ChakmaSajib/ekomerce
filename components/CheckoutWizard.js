import { Stepper, Step, StepLabel } from '@mui/material'
import React from 'react'
import useStyles from '../utils/styles'

const steps = ["Login", "Shipping Address", "Payment Method", "Place Order"]

export default function CheckoutWizard({ activeStep = 0 }) {

    const classes = useStyles()

    return (
        <Stepper activeStep={activeStep} alternativeLabel className={`${classes.checkoutWizard} ${classes.transparentBackground}`}>
            {steps.map((step) => (
                <Step key={step}>
                    <StepLabel>
                        {step}
                    </StepLabel>
                </Step>
            )
            )}
        </Stepper>
    )
}
