export const NoDataFound = ({ title = "No Data Found"  ,image=''}) => {
  return (
    <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12 text-center">
        <img src={image} alt="No Data Found" style={{width:"250px"}} />
        <h1 className="display-2 mb-0 text-muted">{title}</h1>
        <h4>It seems there are no Quiz added yet</h4>
        </div>
     
    </div>
  );
};
