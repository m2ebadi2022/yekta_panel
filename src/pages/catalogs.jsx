import { Nav } from "react-bootstrap";
import { useCheckAuth } from "../middleware";
import { SlideMenu } from "../components/SlideMenu";
import { Footer } from "../components/footer";

export const Catalogs = () => {
    useCheckAuth();
    const style = {
        img: {
            height: "250px",

            objectFit: "cover"
        }
    }
    return (
        <>
           

                    <div className='container py-3 '>

                        <div className="card-group row">
                            <div className="card col-x" style={{ margin: "10px 60px" }}>
                                <img src="https://yektafilmtabriz.com/wp-content/uploads/2022/03/wall-panel-catalog-2022-1.jpg" className="card-img-top " style={style.img} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-info">دانلود</button>
                                </div>
                            </div>
                            <div className="card col-x" style={{ margin: "10px 60px" }}>
                                <img src="https://yektafilmtabriz.com/wp-content/uploads/2022/03/wall-panel-catalog-2021.jpg" className="card-img-top" style={style.img} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-info">دانلود</button>
                                </div>
                            </div>
                            <div className="card col-x" style={{ margin: "10px 60px" }}>
                                <img src="https://yektafilmtabriz.com/wp-content/uploads/2022/03/wall-panel-catalog-2021.jpg" className="card-img-top" style={style.img} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-info">دانلود</button>
                                </div>
                            </div>
                        </div>


                    </div>
               
        </>
    )
}