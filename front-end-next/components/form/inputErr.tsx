export default function InputErr({ logic, warning }) {

    return (
        <>
            {logic &&
                <div className="input-err">
                    <i title={warning} className="bi bi-x-circle">
                        <div></div>
                    </i>
                </div>
            }
        </>)
}