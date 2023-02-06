import '../sass/Button.scss'

const Button = ({ icon, onPressed }) => {
    return (
        <div className='button__box'>
            <button
                className="button"
                onClick={onPressed}>
                {icon}
            </button>
            <div className='button__shadow' />
        </div>
    )
}

export { Button }