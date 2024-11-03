import image from '../assets/ab3.png';

const Logo = ({ width = '10rem' }) => {
	return <img src={image} style={{ width }} alt='Logo' />;
};

export default Logo;
