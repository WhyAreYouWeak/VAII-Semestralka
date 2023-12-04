import "../style/ItemTIle.css"
export default function ItemTile({title, imageURL, price}){
    return <>
        <div className="productTile  justify-content-center">
            <img src="/dama-kontra-strelec.jpg" alt="Product 2" className="img-fluid small-image"/>
            <h4>{title}</h4>
            <p><strong>{price}€</strong></p>
        </div>
    </>
}