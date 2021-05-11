import { useSelector } from 'react-redux';
import {RootState} from '../../redux/loading/loadingReducer';

const GlobalLoading = () => {
  const {loading} = useSelector((state:RootState) => state);

  return (
    <>
      {loading === false ? ''
      :
      <>
        <div className='globalLoadingBackground'>
        </div>
        <div className='globalLoadingIcon'>
          <div className='iconArea'>
            {console.log("로딩 실행 중!!!")}
            {console.log('loading 값:', loading)}
            로딩 중...
          </div>
        </div>
      </>
      }
    </>
  )
}

export default GlobalLoading