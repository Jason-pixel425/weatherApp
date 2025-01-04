import classnames from 'classnames'
//Will need to handle permission not granted
export default function PermissionCheck({children, className, toggle, ...rest}){
    const classes = classnames('permission-container', className ? className : "")
    return(
        <>
        <section className={classes} {...rest}>
            {children}
            <button className="btn-decline" onClick={() => toggle(false)}>Decline</button>
            <button className="btn-accept" onClick={() => toggle(true)}>Accept</button>
        </section>
        </>
    )
}5