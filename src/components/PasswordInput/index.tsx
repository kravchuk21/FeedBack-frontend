import React, {useState} from 'react';
import Input from "../Input";
import IconButton from "../IconButton";
import styles from "./PasswordInput.module.css";

interface PasswordInput extends Input {
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInput>(function PasswordInput({className, ...props}, ref) {
    const [type, setType] = useState<"password" | "text">("password");

    const handleClickIconButton = () => {
        setType("text")
    }

    const handleMouseOutIconButton = () => {
        setType("password")
    }

    return (
        <div className={`${styles.passwordInput} ${className}`}>
            <Input icon="/assets/input_icons/password.svg" type={type} {...props} ref={ref}/>
            <IconButton className={styles.passwordInputIconButton}
                        iconPath="/assets/input_icons/eye.svg"
                        alt="Watch password"
                        onClick={handleClickIconButton}
                        onMouseOut={handleMouseOutIconButton}
                        onBlur={handleMouseOutIconButton}
            />
        </div>
    );
})

export default PasswordInput;

// TODO: change enter event to space
