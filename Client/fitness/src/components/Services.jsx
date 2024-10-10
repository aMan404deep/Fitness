import '../styles/Services.css'
const Services = () => {
  return (
    <div className='service-container'  id="services-section">
      <div className='service-main'>
        <div className='service-heading'>
          <h1>
            This is all what we offer.
          </h1>
        </div>
        <div className='service-content'>
          <div className='service one'>
            <h1>Personalized Workout Plans</h1>
          </div>
          <div className='service two'>
            <h1>Comprehensive Exercise Library</h1>
          </div>
          <div className='service three'>
            <h1>Progress Tracking & Analytics</h1>
          </div>
          <div className='service four'>
            <h1>Nutritional Guidance & Meal Plans</h1>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Services