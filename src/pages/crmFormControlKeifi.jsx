import { useCheckAuth } from "../middleware";

function CrmFormControlKeifi() {
    useCheckAuth();
  return (
    <div  className='container py-3'>
      فرم کنترل کیفی
    </div>
  )
}

export default CrmFormControlKeifi
