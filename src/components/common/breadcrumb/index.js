export const Breadcrumb = ({icon ='' ,label='Lead'}) => {
  return (
    <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
          <i className={`mdi ${icon}`}></i>
        </span>{" "}
       {label}
      </h3>
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <span></span>Overview{" "}
            <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};
