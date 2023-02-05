import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.patch='./productos.txt'
        this.products=[]
    }

    static id =0

    addProduct=async(title,description,price,imagen,code,stock)=>{

         ProductManager.id++ /*cada vez que se agrega un producto con los parametros 
                              indicados, se asigna id incrementado el id */


        let newProduct={
            title,
            description,
            price,
            imagen,
            code,
            stock, 
            id:ProductManager.id
        }
        this.products.push(newProduct)

       await fs.writeFile(this.patch,JSON.stringify(this.products));/*fileSystem con promesas,
        se escribe un archivo con la ruta dada por parametro y se le pasa el array de productos */
       console.log("Producto Agregado")
    };

    readProducts=async()=>{/* funcion que lee los productos del archivo pasado*/
    let respuesta= await fs.readFile(this.patch,"utf-8") 
    return JSON.parse(respuesta)
    }


    getProducts = async () => {/* funcion que lee los productos */ 
        let respuesta2=await this.readProducts()
       return console.log(respuesta2)
    }

/* obetener producto by id, se crea un let que trae la funcion generada,  readProducts, 
dsp se crea una funcion para que si el id ingresado no esta en el listado de productos, por consola aparezca producto no encontrado
sino que devuelva el producto con ese id */ 
    getProductsById=async(id)=>{ 
       let respuesta3=await this.readProducts()
       if(!respuesta3.find(product=>product.id===id)){
        console.log("Producto no encontrado")
       }else{
        console.log(respuesta3.find(product=>product.id===id))
       }
    }

    /*para borrar un producto por id se crea una nueva funcion q llame a la funcion leer los propductos
    
    luego se hace un let filtrer de respuesta3, devuelve un array con los productos que sean distintos al id ingresado*/
    deleteProductById=async(id)=>{
        
            let respuesta3= await this.readProducts();
            let productFilter=respuesta3.filter((products)=>products.id != id)
            await fs.writeFile(this.patch,JSON.stringify(productFilter));
            console.log("Producto Eliminado ")
        } 
    /* para modificar producto mantengo el id y traigo las propiedades de producto 
    luego se borra el producto por id */
    updateProducts=async({id,...producto})=>{
        await this.deleteProductById(id);
        let productOld=await this.readProducts()
        let productsModif=[{...producto,id },...productOld]
        await fs.writeFile(this.patch,JSON.stringify(productsModif))
       }
} 

const productos= new ProductManager(); 

productos.getProducts()
//productos.addProduct("titulo1",'descripcion1',200,"imagen1","asde1",3)
//productos.addProduct("titulo2",'descripcion2',1200,"imagen2","ased2",5)
//productos.addProduct("titulo3",'descripcion3',2200,"imagen3","ased3",9)
//productos.addProduct("titulo4",'descripcion4',200,"imagen4","asde4",3)
//productos.addProduct("titulo5",'descripcion5',1200,"imagen5","ased5",5)
//productos.addProduct("titulo6",'descripcion6',2200,"imagen6","ased6",9)
//productos.addProduct("titulo7",'descripcion7',200,"imagen7","asde7",3)
//productos.addProduct("titulo8",'descripcion8',1200,"imagen8","ased8",5)
//productos.addProduct("titulo9",'descripcion9',2200,"imagen9","ased9",9)
//productos.addProduct("titulo10",'descripcion10',200,"imagen10","asde10",3)


//productos.getProductsById(3)

//productos.deleteProductById(1)

/*productos.updateProducts({
    title: 'titulo2',
    description: 'descripcion2',
    price: 8200,
    imagen: 'imagen5',
    code: 'ased1',
    stock: 5,
    id: 2
  })*/

