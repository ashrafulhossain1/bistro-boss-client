import MenuCard from '../../../components/MenuCard/MenuCard';

const OrderTab = ({ items }) => {
    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {
                items.map(item => <MenuCard
                    key={item._id}
                    item={item}
                ></MenuCard>)
            }
        </div>
    );
};

export default OrderTab;