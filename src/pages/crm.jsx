
import { useCheckAuth } from "../middleware";

export const CRM = () => {
    useCheckAuth();
    return (
        <>
            
                    <div className='container py-3'>
                        <h3>
                            CRM page
                        </h3>

                        <br />



                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">شناسه</th>
                                    <th scope="col"> کد سفارش</th>
                                    <th scope="col">کد محصول</th>
                                    <th scope="col">جزئیات</th>
                                    <th scope="col">وضعیت</th>
                                    <th scope="col">ارسال نظر</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th scope="col">1</th>
                                    <td scope="col"> 21</td>
                                    <td scope="col">67</td>
                                    <td scope="col">جزئیات</td>
                                    <td scope="col">بارگیری</td>
                                    <td scope="col">...</td>
                                </tr>
                                <tr>
                                    <th scope="col">2</th>
                                    <td scope="col"> 23</td>
                                    <td scope="col">1</td>
                                    <td scope="col">جزئیات</td>
                                    <td scope="col">بارگیری</td>
                                    <td scope="col">...</td>
                                </tr>
                                <tr>
                                    <th scope="col">3</th>
                                    <td scope="col"> 21</td>
                                    <td scope="col">32</td>
                                    <td scope="col">جزئیات</td>
                                    <td scope="col">بارگیری</td>
                                    <td scope="col">...</td>
                                </tr>
                                <tr>
                                    <th scope="col">5</th>
                                    <td scope="col"> 32</td>
                                    <td scope="col">54</td>
                                    <td scope="col">جزئیات</td>
                                    <td scope="col">بارگیری</td>
                                    <td scope="col">...</td>
                                </tr>



                            </tbody>

                        </table>

                    </div>
              
        </>
    )
}