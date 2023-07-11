import { Dialog } from "@headlessui/react";
import { useState } from "react";


export default function AccountDialog() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
                <Dialog.Title>Account Information</Dialog.Title>
                <Dialog.Description>
                    Edit your account info
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of your data
                    will be permanently removed. This action cannot be undone.
                </p>
                <button onClick={() => setIsOpen(false)}>Deactivate</button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}