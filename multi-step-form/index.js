import MultistepForm from "./src/multiStepForm";
import PersonalInfoStep from "./src/personalInfoStep";
import PlanStep from "./src/planStep"
import AddOnsStep from "./src/addOnsStep"
import SummaryStep from "./src/summaryStep"
import ThankYouStep from "./src/thankYouStep"

const planCards = [
    {
        iconPath: "assets/images/icon-arcade.svg",
        name: "Arcade",
        monthlyPrice: 9,
        yearlyPrice: 90,
    },
    {
        iconPath: "assets/images/icon-advanced.svg",
        name: "Advanced",
        monthlyPrice: 12,
        yearlyPrice: 120,
    },
    {
        iconPath: "assets/images/icon-pro.svg",
        name: "Pro",
        monthlyPrice: 15,
        yearlyPrice: 150,
    },
];

const addOnCards = [
    {
        name: "Online Service",
        description: "Access to multiplayer games",
        monthlyPrice: 1,
        yearlyPrice: 10,
    },
    {
        name: "Larger storage",
        description: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20,
    },
    {
        name: "Customizable Profile",
        description: "Custom theme on your profile",
        monthlyPrice: 2,
        yearlyPrice: 20,
    },
];

const defaultFormData = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    selectedPlan: {
        planName: "",
        planPrice: "",
        paymentPeriod: "month",
    },
    selectedAddOns: []
}

const personalInfoStep = new PersonalInfoStep()
const planStep = new PlanStep(planCards)
const addOnsStep = new AddOnsStep(addOnCards)
const summaryStep = new SummaryStep()
const thankYouStep = new ThankYouStep()

const multiStepForm = new MultistepForm([personalInfoStep, planStep, addOnsStep, summaryStep], thankYouStep, defaultFormData)
