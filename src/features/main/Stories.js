

const Stories = () => {
    
    const handleScroll = (e) => {
        e.preventDefault()
        window.scrollBy({
            top: -100,
            behavior: "smooth"
        });
        document.querySelector('.top-roll').scrollBy({
            left: e.deltaY < 0 ? -30 : 30,
        });
    }

  return (
    <ul className="top-roll" onWheel={handleScroll}>
    <li>
        <img src="36772.jpg" alt="profile" />
        <p>cow_girl</p>
    </li>
    </ul>
  )
}

export default Stories