import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
    const [isOpen, setIsOpen] = useState(Array(15).fill(false));

    const toggleHelp = (index) => {
        const newIsOpen = isOpen.map((state, i) => i === index ? !state : false);
        setIsOpen(newIsOpen);
    };

    const questions = [
        { question: "How can I register my Company?" },
        { question: "Do you have any option to claim existing Company?" },
        { question: "Are there any option to change the data of my Company?" },
        { question: "Do you provide any support?" },
        { question: "What documents are required for registration?" },
        { question: "Can I register multiple companies under one account?" },
        { question: "How long does the registration process take?" },
        { question: "Is there a fee for registering my company?" },
        { question: "How do I update my company's contact information?" },
        { question: "Can I delete my company profile?" },
        { question: "How do I reset my account password?" },
        { question: "What should I do if my company registration is denied?" },
        { question: "How can I contact customer support?" },
        { question: "Is there a mobile app available?" },
        { question: "Can I track the status of my registration?" }
    ];

    const answers = [
        { answer: "To register your company, go to the registration page and fill out the required information. Make sure to have all necessary documents ready." },
        { answer: "Yes, you can claim an existing company by providing proof of ownership. Visit the claim page for more details and the required steps." },
        { answer: "You can change the data of your company by accessing your company profile and updating the information. Some changes might require verification." },
        { answer: "Yes, we provide 24/7 support through our helpdesk. You can contact us via email, phone, or live chat for any assistance you need." },
        { answer: "The required documents for registration typically include your business license, identification, and proof of address. Please check the registration page for a full list." },
        { answer: "Yes, you can register multiple companies under one account. Each company will have its own profile and management settings." },
        { answer: "The registration process usually takes 3-5 business days, depending on the completeness of your submitted documents and verification process." },
        { answer: "There is a nominal fee for registering your company. Please refer to the pricing page for detailed information on the fees." },
        { answer: "To update your company's contact information, log in to your account, go to the company profile, and make the necessary changes." },
        { answer: "Yes, you can delete your company profile from your account settings. Note that this action is irreversible." },
        { answer: "To reset your account password, go to the login page and click on 'Forgot Password.' Follow the instructions to reset your password." },
        { answer: "If your company registration is denied, you will receive an email with the reasons. You can rectify the issues and reapply." },
        { answer: "You can contact customer support via email, phone, or live chat. Our support team is available 24/7 to assist you." },
        { answer: "Yes, we have a mobile app available for both iOS and Android. You can download it from the App Store or Google Play." },
        { answer: "You can track the status of your registration by logging into your account and navigating to the registration status page." }
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-4/5 max-w-4xl">
                <div className="text-[50px] font-poppins font-bold text-center mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>We Have Answers</div>
                {questions.map((item, index) => (
                    <div key={index} className="mb-4 bg-white border border-gray-300 rounded-lg">
                        <button
                            onClick={() => toggleHelp(index)}
                            className="flex items-center w-full text-left py-3 px-5 font-bold rounded-lg shadow-md"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <FontAwesomeIcon icon={isOpen[index] ? faMinus : faPlus} className="mr-3 text-red-500" />
                            {item.question}
                        </button>
                        {isOpen[index] && (
                            <div className="text-gray-700 px-5 py-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {answers[index].answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
