const ScreenHelper = {
    isInBottom: () => window.scrollY + window.innerHeight > document.body.scrollHeight - 100
};

export default ScreenHelper;
