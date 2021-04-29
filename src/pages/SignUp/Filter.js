import React, { useEffect, useRef, useState } from "react";

const Filter = () => {

  const [checkBoxes, setCheckBoxes] = useState([
    {id: 'without', label: "뭔가다름", isChecked: true},
    {id: 'one', label: "1", isChecked: true},
    {id: 'two', label: "2", isChecked: true},
    {id: 'three', label: "3", isChecked: true}
  ])

  const [mainCheckbox, setMainCheckbox] = useState({
    id: 'all', label: "모두체크", isChecked: true
  })

  const allCheckBoxesChange = ({ target : { checked } }) => {
    const newMainCheckbox = {
      ...mainCheckbox,
      isChecked: checked
    }
    setMainCheckbox(newMainCheckbox)

    // Check what other checkboxes state need to be
    let allCheckBoxes = [...checkBoxes]
    allCheckBoxes.forEach(item => {
      item.isChecked = newMainCheckbox.isChecked;
    })
    setCheckBoxes(allCheckBoxes)
  }

  const checkBoxChange = ({ target : { name, checked } }) => {
    let newCheckBoxes = [...checkBoxes]
    newCheckBoxes.forEach(item => {
      if (item.id === name) {
        item.isChecked = checked
      }
    })
    setCheckBoxes(newCheckBoxes)

    // Check what state should main be
    const isEveryBoxChecked = newCheckBoxes.every((value) => value.isChecked)
    setMainCheckbox({...mainCheckbox, isChecked: isEveryBoxChecked})
  }


  return (
    <div className="content__filter">
      <div className="content__filter__name">
        Количество пересадок
      </div>
      <div className="content__filter__list">
        <div className="content__filter__item">
          <label htmlFor={mainCheckbox.id}>{mainCheckbox.label}</label>
          <input
            type="checkbox"
            id={mainCheckbox.id}
            name={mainCheckbox.id}
            checked={mainCheckbox.isChecked}
            onChange={allCheckBoxesChange}
          />
        </div>
        <ul>
          {checkBoxes.map(item => (
            <CheckBox
              key={item.id}
              id={item.id}
              name={item.id}
              htmlFor={item.id}
              label={item.label}
              checked={item.isChecked}
              onChange={checkBoxChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const CheckBox = ({
                    type = "checkbox",
                    name,
                    htmlFor,
                    label,
                    onChange,
                    checked,
                    id,
                  }) => {
  return (
    <div className="content__filter__item">
      <input
        type={type}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  )
};

export default Filter;