import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { EditEntryType, ValidationType } from "../utils/types";
import { validateValue } from "../utils/validations";
import Address from "./Fields/Address";
import Article from "./Fields/Article";
import Checkbox from "./Fields/Checkbox";
import Date from "./Fields/Date";
import DoubleTextList from "./Fields/DoubleTextList";
import Photo from "./Fields/Photo";
import PillList from "./Fields/PillList";
import ProfilePhoto from "./Fields/ProfilePhoto";
import Radio from "./Fields/Radio";
import Select from "./Fields/Select";
import Showcase from "./Fields/Showcase";
import Text from "./Fields/Text";
import TextArea from "./Fields/TextArea";
import TextList from "./Fields/TextList";

const toast = {};

export function EditForm(props) {
  const [entity, setEntity] = useState(props.entityObj);
  const [characterCounts, setCharacterCounts] = useState({});

  const [pillList, setPillList] = useState([]);
  useEffect(() => {
    const multiselect = props.editEntries.find((entry) => {
      return entry.type === EditEntryType.PillList;
    });
    const currMultiselectValues = multiselect.options.map((option) => {
      const isSelected = entity?.[multiselect.attribute]?.includes(
        option.value
      );
      return { value: option.value, isSelected };
    });
    setPillList(
      currMultiselectValues.sort((a, b) => a.value.localeCompare(b.value))
    );
  }, [props.editEntries, entity]);

  const [uploadPhotoMap] = useState({});

  useEffect(() => {
    setEntity(props.entityObj);
  }, [props.entityObj]);

  const shadowFileInput = useRef([]);
  useEffect(() => {
    shadowFileInput.current = shadowFileInput.current.slice(
      0,
      props.editEntries
    );
  }, [props.editEntries]);

  const [listFieldSize, setListFieldSize] = useState([]);
  useEffect(() => {
    const currListFieldSize = props.editEntries.map((entry) => {
      const isArrField =
        props.entityObj &&
        (entry.type === EditEntryType.TextList ||
          entry.type === EditEntryType.DoubleTextList);
      const isArrayLength =
        entry.attribute in props.entityObj && props.entityObj[entry.attribute]
          ? Object.keys(props.entityObj[entry.attribute]).length
          : 0;
      return isArrField ? isArrayLength : 0;
    });
    setListFieldSize(currListFieldSize);
  }, [props.editEntries, props.entityObj]);

  const [radioFieldValue, setRadioFieldValue] = useState([]);
  useEffect(() => {
    const currRadioFieldValue = props.editEntries.map((entry) => {
      const isRadioField =
        props.entityObj && entry.type === EditEntryType.Radio;
      return isRadioField ? props.entityObj[entry.attribute] : "";
    });
    setRadioFieldValue(currRadioFieldValue);
  }, [props.editEntries, props.entityObj]);

  const [checkboxFieldValue, setCheckboxFieldValue] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateTargets = new Set(
      props.editEntries.map((editEntry) => editEntry.attribute)
    );
    const editEntryIdx = Object.fromEntries(
      props.editEntries.map((editEntry, index) => [editEntry.attribute, index])
    );

    for (const target of event.target) {
      if (!target.name) continue;
      if (updateTargets.has(target.name)) {
        // if target is radio button, only update if it is checked
        if (target.type === "radio" && !target.checked) continue;
        entity[target.name] = target.value;
      } else if (
        target.name.includes("_") &&
        updateTargets.has(target.name.split("_")[0])
      ) {
        const entity_field = target.name.split("_")[0];
        const entity_sub_field = target.name.split("_").slice(1).join("_");

        if (entity_sub_field.includes("listfieldidx_")) {
          const entity_curr_idx = entity_sub_field.split("_")[1];
          const entity_sub_sub_field = entity_sub_field.split("_").slice(2);
          const max_idx_to_take = listFieldSize[editEntryIdx[entity_field]];
          if (entity_curr_idx >= max_idx_to_take) continue;
          if (!entity[entity_field]) entity[entity_field] = [];
          if (!entity[entity_field][entity_curr_idx])
            entity[entity_field][entity_curr_idx] = {};
          entity[entity_field][entity_curr_idx][entity_sub_sub_field] =
            target.value;
        } else if (entity_sub_field.includes("listfieldsingleidx_")) {
          const entity_curr_idx = entity_sub_field.split("_")[1];
          const max_idx_to_take = listFieldSize[editEntryIdx[entity_field]];
          if (entity_curr_idx >= max_idx_to_take) continue;
          if (!entity[entity_field]) entity[entity_field] = [];
          if (!entity[entity_field][entity_curr_idx])
            entity[entity_field][entity_curr_idx] = {};
          entity[entity_field][entity_curr_idx] = target.value;
          console.log(entity[entity_field], entity["badges"], entity);
        } else {
          if (!entity[entity_field]) entity[entity_field] = {};

          if (
            typeof target.value === "string" &&
            (target.value.includes("\n") ||
              (entity_sub_field === "content" && target.value))
          ) {
            entity[entity_field][entity_sub_field] = target.value
              .split("\n")
              .filter((e) => !!e);
          } else {
            entity[entity_field][entity_sub_field] = target.value;
          }
        }
      }
    }

    for (const [target_name, target_value] of Object.entries(uploadPhotoMap)) {
      if (updateTargets.has(target_name)) {
        entity[target_name] = target_value;
      } else if (
        target_name.includes("_") &&
        updateTargets.has(target_name.split("_")[0])
      ) {
        const entity_field = target_name.split("_")[0];
        const entity_sub_field = target_name.split("_").slice(1).join("_");
        if (!entity[entity_field]) entity[entity_field] = {};
        entity[entity_field][entity_sub_field] = target_value;
      }
    }

    for (const editEntry of props.editEntries) {
      if (editEntry.isRequired) {
        if (!entity[editEntry.attribute]) {
          toast.error(`Field is required: "${editEntry.attributeName}"`);
          return;
        }
      }
      if (editEntry.type === EditEntryType.Checkbox) {
        entity[editEntry.attribute] = checkboxFieldValue;
      }

      // For Article fields
      if (editEntry.type === EditEntryType.Article) {
        const article = entity[editEntry.attribute];

        const filledCount = [
          article["title"],
          article["content"],
          article["image_url"],
          article["subtitle"],
          article["button_link"],
        ].filter((e) => e).length;

        const mandatoryFilledCount = [
          article["title"],
          article["content"],
          article["image_url"],
        ].filter((e) => e).length;

        if (filledCount > 0 && mandatoryFilledCount < 3) {
          console.log(
            filledCount,
            mandatoryFilledCount,
            article["title"],
            article["content"],
            article["image_url"]
          );
          toast.error(
            "Title, Content, and Photo are required for " +
              editEntry.attributeName +
              "."
          );
          return;
        }
        if (!article["title"] && !article["content"]) {
          entity[editEntry.attribute] = {};
        }
      }

      // For TextList fields
      const max_idx_to_take = listFieldSize[editEntryIdx[editEntry.attribute]];
      if (max_idx_to_take > 0) {
        entity[editEntry.attribute] = Object.fromEntries(
          Object.entries(entity[editEntry.attribute]).filter(
            ([k, v]) => parseInt(k, 10) < max_idx_to_take && v["0"] && v["1"]
          )
        );
      }

      if (editEntry.validations) {
        for (const validation of editEntry.validations) {
          if (
            !validateValue(
              entity[editEntry.attribute],
              editEntry.attributeName,
              validation
            )
          ) {
            return;
          }
        }
      }

      // For Showcase fields
      if (editEntry.type === EditEntryType.Showcase) {
        const showcase = entity[editEntry.attribute];
        const isInstagramShowcase = editEntry.extraParam.isInstagramShowcase;
        const numRequiredFields = isInstagramShowcase ? 5 : 2; // All fields required
        const maxPhotos = editEntry.extraParam.maxPhotos;

        const numPhotos = 0;
        if (maxPhotos && numPhotos > maxPhotos) {
          toast.error(
            `Please make sure the ${editEntry.attributeName} section has no more than ${maxPhotos} photos.`
          );
          return;
        }

        let filledCount = [showcase["title"], numPhotos > 0].filter(
          (e) => e
        ).length;

        if (isInstagramShowcase) {
          filledCount += [
            showcase["handle"],
            showcase["url"],
            showcase["profile_photo_url"],
          ].filter((e) => e).length;
        }

        if (filledCount > 0 && filledCount < numRequiredFields) {
          toast.error(
            `Title${
              isInstagramShowcase ? ", Handle, Profile URL, Profile Photo," : ""
            } and Images are required for ${editEntry.attributeName}.`
          );
          return;
        }
      }
    }

    if (props.onSubmitSuccess) {
      try {
        props.onSubmitSuccess(entity);
        toast.success("Successfully submitted!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative lg:pt-5 text-left'>
      <form
        className='space-y-8 divide-y divide-gray-200'
        onSubmit={handleSubmit}
      >
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div>
              <h3 className='text-3xl font-medium leading-6 text-gray-900'>
                {props.title}
              </h3>
              <p className='my-2 text-sm text-gray-500'>{props.description}</p>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              {props.editEntries.map((editEntry, index) => {
                const requiredMark = editEntry.isRequired ? "*" : "";
                if (editEntry.condition != null) {
                  if (!editEntry.condition) return null;
                }
                switch (editEntry.type) {
                  case EditEntryType.Text:
                    return (
                      <Text
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                      />
                    );
                  case EditEntryType.Select:
                    return (
                      <Select
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                      />
                    );
                  case EditEntryType.Date:
                    return (
                      <Date
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                      />
                    );
                  case EditEntryType.TextList:
                    return (
                      <TextList
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                        listFieldSize={listFieldSize}
                        setListFieldSize={setListFieldSize}
                        index={index}
                      />
                    );
                  case EditEntryType.DoubleTextList:
                    return (
                      <DoubleTextList
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                        index={index}
                        listFieldSize={listFieldSize}
                        setListFieldSize={setListFieldSize}
                      />
                    );
                  case EditEntryType.Checkbox:
                    return (
                      <Checkbox
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        setCheckboxFieldValue={setCheckboxFieldValue}
                      />
                    );
                  case EditEntryType.Radio:
                    return (
                      <Radio
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        radioFieldValue={radioFieldValue}
                        setRadioFieldValue={setRadioFieldValue}
                        requiredMark={requiredMark}
                        index={index}
                      />
                    );
                  case EditEntryType.TextArea:
                    return (
                      <TextArea
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        characterCounts={characterCounts}
                        setCharacterCounts={setCharacterCounts}
                        requiredMark={requiredMark}
                      />
                    );
                  case EditEntryType.File:
                    return null;
                  case EditEntryType.FilePhoto:
                    return null;
                  case EditEntryType.ProfilePhoto:
                    return (
                      <ProfilePhoto
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                        uploadPhotoMap={uploadPhotoMap}
                        shadowFileInput={shadowFileInput}
                        index={index}
                      />
                    );
                  case EditEntryType.Photo:
                    return (
                      <Photo
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        uploadPhotoMap={uploadPhotoMap}
                        requiredMark={requiredMark}
                        entity={entity}
                        shadowFileInput={shadowFileInput}
                        index={index}
                      />
                    );
                  case EditEntryType.Article:
                    return (
                      <Article
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        index={index}
                        shadowFileInput={shadowFileInput}
                        uploadPhotoMap={uploadPhotoMap}
                      />
                    );
                  case EditEntryType.Address:
                    return (
                      <Address
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                      />
                    );
                  case EditEntryType.Showcase:
                    return (
                      <Showcase
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        shadowFileInput={shadowFileInput}
                        uploadPhotoMap={uploadPhotoMap}
                        index={index}
                      />
                    );
                  case EditEntryType.PillList:
                    return (
                      <PillList
                        key={editEntry.attribute}
                        editEntry={editEntry}
                        entity={entity}
                        requiredMark={requiredMark}
                        pillList={pillList}
                        setPillList={setPillList}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='button'
              className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {props.buttonText ? props.buttonText : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

EditForm.propTypes = {
  editEntries: PropTypes.arrayOf(
    PropTypes.shape({
      attributeName: PropTypes.string,
      attribute: PropTypes.string,
      subName: PropTypes.string,
      button: PropTypes.string,
      options: PropTypes.array,
      extraParam: PropTypes.shape({
        isInstagramShowcase: PropTypes.bool,
      }),
      isRequired: PropTypes.bool,
      validations: PropTypes.arrayOf(
        PropTypes.oneOf(Object.values(ValidationType))
      ),
      info: PropTypes.string,
      characterCount: PropTypes.number,
      type: PropTypes.oneOf(Object.values(EditEntryType)),
      condition: PropTypes.bool,
    })
  ),
  title: PropTypes.string,
  description: PropTypes.string,
  entityObj: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  buttonText: PropTypes.string,
};
