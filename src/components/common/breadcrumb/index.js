import { NormalButton } from "../../common";
export const Breadcrumb = ({
  icon = "",
  label = "Lead",
  rightButtonLabel = "",
  onClickRightButton = () => {},
}) => {
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
          {rightButtonLabel && (
            <li className="breadcrumb-item">
              <NormalButton
                className=" ms-3 btn btn-gradient-primary btn-fw btn-icon-text"
                onClick={onClickRightButton ? onClickRightButton : ""}
                label={rightButtonLabel}
              />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
