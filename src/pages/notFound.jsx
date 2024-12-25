import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="authincation h-100">
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-5">
                    <div className="form-input-content text-center error-page">
                        <h1 className="error-text font-weight-bold">404</h1>
                        <h4><i className="fa fa-exclamation-triangle text-warning"></i> صفحه مورد نظر شما یافت نشد!</h4>
                       
						<div>
                            <Link className="btn btn-primary" to="/">برو صفحه اصلی</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound
