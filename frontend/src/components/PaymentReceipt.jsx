import {React , useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaPrint } from 'react-icons/fa';
import logo from '../assets/logo.png';
const PaymentReceipt =  ({ show, onClose }) => {
 
  const Buy = useSelector((state) => state.buy);
  const Auth = useSelector((state) => state.auth);
  let Dat = new Date().toISOString().split('T')[0];

  const Pro = JSON.parse(localStorage.getItem('Product'));
  console.log(Buy)

  const totalPrice = Pro?.carttt?.reduce((sum, item) => sum + item.aprice, 0);
  console.log(totalPrice)

  const DisPr = Buy.cartItems.reduce((sum, item) => sum + item.aprice, 0);
  const total = Number(Pro?.itemsPrice); // Convert totalll to a number if it's not already
  const totalP = Number(Pro?.totalPrice); // Convert totalll to a number if it's not already
  const finalTotal = Math.abs(totalPrice - total);

  const final = totalP + finalTotal;
  const Dis1 = Number(Buy.itemsPrice);
  const Dis = DisPr - Dis1;
  const sub = Number(Buy.totalPrice);
  const subI = sub + Dis;

  const [action, setAction] = useState();
  useEffect(() => {

   const get = localStorage.getItem('Action')
   console.log(get)
   setAction(get);
 }, []);
  const Print = () => {
    window.print();
  };

  if (!show) {
    return null;
  }

  return (
    <>

      <div className="container mt-6 mb-7 print popup">
        <style>
          {
            `
            @media print {
  body *  {
    visibility: hidden;
  }


  .print *  {
    visibility: visible;
  }


  .butt * {
   visibility: hidden;
  }
}
        `
          }
        </style>

        {action === 'false' ? 
        (
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-7">
            <div className="card">
              <div className='d-inline-flex justify-content-end gap-4 mt-4 px-2 butt'>
                <FaPrint size={30} style={{ cursor: 'pointer' }} onClick={Print} />
                <FaPlus size={30} color='#9F0000' style={{ transform: 'rotate(45deg)', cursor: 'pointer' }} onClick={onClose} />
              </div>
              <div>
                <img src={logo} alt='GhadiPasal' className='px-5' />
              </div>

              <div className="card-body px-5">
                <h2>Hey, {Auth.userInfo.name}</h2>


                <div className="border-top border-gray-200 pt-4 mt-4">


                  <div>
                    <div className="text-muted  d-flex justify-content-end">Payment Date</div>
                    <strong className='d-flex justify-content-end'>{Dat}</strong>
                  </div>
                </div>

                <div className="border-top border-gray-200 mt-4 py-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-muted mb-2">Client</div>
                      <strong>{Auth.userInfo.name}</strong>
                      <p className="fs-sm">

                        <a href={`mailto:${Auth.userInfo.email}`} className="text-purple">
                          {Auth.userInfo.email}
                        </a>

                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="text-muted mb-2">Payment To</div>
                      <strong>GhadiPasal</strong>
                      <p className="fs-sm">
                        Kathmandu, Nepal
                        <br />
                        <a href="mailto:pradeepdangi255@gmail.com" className="text-purple">pradeepdangi255@gmail.com</a>

                      </p>
                    </div>
                  </div>
                </div>

                <div>

                </div>
                <>
                  {/* {Pro.carttt.map((item) => (
                    <div className='flex' key={item._id} style={{}}>
                      <h1>{item.taxPrice}</h1>


                    </div>
                  ))} */}

                  <h1>{Pro.itemsPrice}</h1>
                  <table className="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                      </tr>
                    </thead>


                    <tbody>

                      <tr>
                        <td className="px-0">Tax Price
                        </td>

                        <td className="text-end px-0"> {Pro?.taxPrice}</td>
                      </tr>
                      <tr>
                        <td className="px-0">Shipping Charge</td>
                        <td className="text-end px-0">{Pro?.shippingPrice}</td>
                      </tr>

                    </tbody>
                  </table>

                  <div className="mt-5">
                    {/* <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Subtotal:</p>
                      <span>{final}</span>
                    </div> */}
                    {/* <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Discount:</p>
                      <span>-{finalTotal}</span>
                    </div> */}

                    <div className="d-flex justify-content-end mt-3">
                      <h5 className="me-3">Total:</h5>
                      <h5 className="text-success">    Rs.{Pro.totalPrice}</h5>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
        )
        : 
        (
    
       
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-7">
            <div className="card">
              <div className='d-inline-flex justify-content-end gap-4 mt-4 px-2 butt'>
                <FaPrint size={30} style={{ cursor: 'pointer' }} onClick={Print} />
                <FaPlus size={30} color='#9F0000' style={{ transform: 'rotate(45deg)', cursor: 'pointer' }}   onClick={onClose} />
              </div>
              <div>
                <img src={logo} alt='GhadiPasal' className='px-5' />
              </div>

              <div className="card-body px-5">
                <h2>Hey, {Auth.userInfo.name}</h2>


                <div className="border-top border-gray-200 pt-4 mt-4">


                  <div>
                    <div className="text-muted  d-flex justify-content-end">Payment Date</div>
                    <strong className='d-flex justify-content-end'>{Dat}</strong>
                  </div>
                </div>

                <div className="border-top border-gray-200 mt-4 py-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-muted mb-2">Client</div>
                      <strong>{Auth.userInfo.name}</strong>
                      <p className="fs-sm">

                        <a href={`mailto:${Auth.userInfo.email}`} className="text-purple">
                          {Auth.userInfo.email}
                        </a>

                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="text-muted mb-2">Payment To</div>
                      <strong>GhadiPasal</strong>
                      <p className="fs-sm">
                        Kathmandu, Nepal
                        <br />
                        <a href="mailto:pradeepdangi255@gmail.com" className="text-purple">pradeepdangi255@gmail.com</a>

                      </p>
                    </div>
                  </div>
                </div>

                <div>

                </div>
                <>
                  {/* {Pro.carttt.map((item) => (
                    <div className='flex' key={item._id} style={{}}>
                      <h1>{item.taxPrice}</h1>


                    </div>
                  ))} */}
                  <table className="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                      </tr>
                    </thead>


                    <tbody>

                      <tr>
                        <td className="px-0">Tax Price
                        </td>

                        <td className="text-end px-0"> {Buy?.taxPrice}</td>
                      </tr>
                      <tr>
                        <td className="px-0">Shipping Charge</td>
                        <td className="text-end px-0">{Pro?.shippingPrice}0.00</td>
                      </tr>
                      <tr>
                        <td className="px-0">Item Price</td>
                        <td className="text-end px-0">{Buy?.itemsPrice}</td>
                      </tr>

                    </tbody>
                  </table>

                  <div className="mt-5">
                    {/* <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Subtotal:</p>
                      <span>{subI}</span>
                    </div>
                    <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Discount:</p>
                      <span>-{Dis}</span>
                    </div> */}

                    <div className="d-flex justify-content-end mt-3">
                      <h5 className="me-3">Total:</h5>
                      <h5 className="text-success">  Rs.{Buy?.totalPrice}</h5>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
        )
      }
      </div>
    </>
  );
};

export { PaymentReceipt };
