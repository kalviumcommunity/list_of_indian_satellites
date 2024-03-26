import { Link } from 'react-router-dom';
import './mainpage.css'
function Main() {
  return (
    <div className='Baground'>
      <div>
        <h2 className='sat-name'>Chandrayaan-3</h2>
        <h4 className='sat-agenda'>Lunar Exploration</h4>
      </div>
      <div className='launch-data'>
        <h3 className='laun-date'>Launch Date: </h3>
        <h3 className='laun-vehicle'> Launch Vehicle:</h3>
        <h3 className='laun-site'> Launch Site:</h3>
      </div>
      <div className='launch-datas'>
        <h5 className='lauch-date'>14 July 2023, 09:05:17 (UTC) </h5>
        <h5 className='lauch-vehicle'> LVM3 M04</h5>
        <h5 className='lauch-site'>Satish Dhawan Space Centre, Sriharikota, Andhra Pradesh</h5>
      </div>
      <div>
        <img src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/08/chandrayaan-3-5-1691547437.jpg" alt="" className='sat-image'/>
      </div>
      <button className='back-btn'>← Back</button>
      <button className='next-btn'>Next →</button>
      <nav >
        <Link to='/' className='link'>Home</Link>
        <Link to='/about' className='link'>About</Link>
        <Link to='/mainpage' className='link'>Explore</Link>
        <Link to='/apipage' className='link'>Api</Link>
      </nav>
    </div>
  );
}

export default Main;