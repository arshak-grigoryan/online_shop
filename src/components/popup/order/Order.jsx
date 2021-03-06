import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCart } from '../../../store/selectors';
import { order, invoiceModalToggle } from '../../../store/actions';
import { MONTHS } from '../../../constants';
import './order.scss';

const Order = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [el, setEl] = useState();
  const [tableHeight, setTableHeight] = useState();

  const { cart } = useSelector((state) => ({
    cart: getCart(state),
  }));

  useEffect(() => {
    if (!el) {
      const elem = document.getElementById('modalTable');
      setEl(elem);
    } else {
      const { height } = el.getBoundingClientRect();
      setTableHeight(height);
    }
  }, [el]);

  useEffect(() => {
    let total = 0;
    cart.forEach(({ price, count }) => {
      total += price * count;
    });
    setTotalPrice(total);
  }, [cart]);

  const onCloseInvoiceClick = () => {
    dispatch(order());
    dispatch(invoiceModalToggle());
  };

  return (
    <div className="modalPopup">
      <div className="order">
        <div className="top">
          <div className="w">
            <span>{new Date().getHours()}:</span>
            <span>{new Date().getMinutes()}:</span>
            <span>{new Date().getSeconds()}</span>
            <span className="type">AM</span>
            {/* <span>{DAYS[new Date().getDay()]}</span> */}
          </div>
          <div className="dmy">
            <span>{new Date().getDate()}</span>
            <span>{MONTHS[new Date().getMonth()]}</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
        <h1>Order</h1>
        <div
          id="modalTable"
          className="table"
          style={{
            height:
              tableHeight > window.innerHeight / 2
                ? window.innerHeight / 2
                : tableHeight,
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price $</th>
                <th>Count</th>
                <th>Total $</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ ruiid, name, price, count }) => (
                <tr key={ruiid}>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{count}</td>
                  <td>{price * count}</td>
                </tr>
              ))}
              <tr key="total">
                <td></td>
                <td></td>
                <td></td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <div className="closeOrder" onClick={onCloseInvoiceClick}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
