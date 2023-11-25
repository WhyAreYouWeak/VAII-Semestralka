import "../style/ItemTIle.css"
export default function ItemTile(){
    return <>
        <div className="productTile  justify-content-center">
            <img src="/dama-kontra-strelec.jpg" alt="Product 2" className="img-fluid small-image"/>
            <h4>Product 2</h4>
            <p><strong>$29.99</strong></p>
        </div>
    </>
}