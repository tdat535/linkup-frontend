
const Home = () => (

    <main className="flex-1 overflow-y-auto">
      <div className=" border-b-1 border-white p-6 rounded-lg w-auto">
        <input type="text" placeholder="Hôm nay của bạn như thế nào?" className="w-full bg-gray-700 p-2 rounded mb-5" />
        <div className="flex justify-between">
          <button className="bg-blue-500 p-2 pl-10 pr-10  rounded-full   hover:bg-blue-700">Đăng</button>
          <div>
          
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className ="">
                    <svg className="w-8 h-8  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
  
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-6 grid justify-items-center">
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">Romeo - 20p</p>
            <p>"Come, sweetings, time to be born, anew"</p>
          </div>
          <img src="https://casaseguro.asia/wp-content/uploads/2022/10/dau-tu-dinh-cu-anh-quoc-casa-seguro-0001.jpg" alt="post" className="rounded mt-2 w-full" />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">Romeo - 20p</p>
            <p>"Come, sweetings, time to be born, anew"</p>
          </div>
          <img src="https://casaseguro.asia/wp-content/uploads/2022/10/dau-tu-dinh-cu-anh-quoc-casa-seguro-0001.jpg" alt="post" className="rounded mt-2 w-full" />
        </div>  
      </div>
    </main>
  );
    
export default Home;
    