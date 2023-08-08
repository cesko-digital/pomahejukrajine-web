import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import ButtonBack from "./ButtonBack";

interface OfferUsefulLinksProps {
	offerType: Record<string, any>;
	isOverlayShown: boolean;
	onModalClose: any;
}

interface Category {
	header: string;
	leftHalf: string[];
	rightHalf: string[];
}

interface Content {
	[category: string]: Category;
}

export const OfferUsefulLinks: React.FC<OfferUsefulLinksProps> = ({
	offerType,
	isOverlayShown,
	onModalClose,
}) => {
	const { t } = useTranslation();

	const content: Content = {
		"Dobrovolnická pomoc": {
			header: t("common:usefulLinks.volunteerHelp.header"),
			leftHalf: [
				t("common:usefulLinks.volunteerHelp.link1"),
				t("common:usefulLinks.volunteerHelp.link2"),
				t("common:usefulLinks.volunteerHelp.text1"),
			],
			rightHalf: [],
		},
		"Materiální pomoc": {
			header: t("common:usefulLinks.materialHelp.header"),
			leftHalf: [
				t("common:usefulLinks.materialHelp.link1"),
				t("common:usefulLinks.materialHelp.link2"),
				t("common:usefulLinks.materialHelp.link3"),
			],
			rightHalf: [
				t("common:usefulLinks.materialHelp.link4"),
				t("common:usefulLinks.materialHelp.link5"),
				t("common:usefulLinks.materialHelp.link6"),
				t("common:usefulLinks.materialHelp.link7"),
			],
		},
		Doprava: {
			header: t("common:usefulLinks.transport.header"),
			leftHalf: [
				t("common:usefulLinks.transport.link1"),
				t("common:usefulLinks.transport.link2"),
			],
			rightHalf: [],
		},
		Doučování: {
			header: t("common:usefulLinks.tutoring.header"),
			leftHalf: [
				t("common:usefulLinks.tutoring.link1"),
				t("common:usefulLinks.tutoring.link2"),
				t("common:usefulLinks.tutoring.text2"),
				t("common:usefulLinks.tutoring.text3"),
			],
			rightHalf: [
				t("common:usefulLinks.tutoring.text4"),
				t("common:usefulLinks.tutoring.text5"),
				t("common:usefulLinks.tutoring.text6"),
				t("common:usefulLinks.tutoring.text7"),
			],
		},
		"Kurzy českého jazyka": {
			header: t("common:usefulLinks.czechLanguage.header"),
			leftHalf: [
				t("common:usefulLinks.czechLanguage.link1"),
				t("common:usefulLinks.czechLanguage.text2"),
				t("common:usefulLinks.czechLanguage.subtitle1"),
				t("common:usefulLinks.czechLanguage.link2"),
				t("common:usefulLinks.czechLanguage.link3"),
			],
			rightHalf: [
				t("common:usefulLinks.czechLanguage.subtitle2"),
				t("common:usefulLinks.czechLanguage.text5"),
				t("common:usefulLinks.czechLanguage.text6"),
				t("common:usefulLinks.czechLanguage.link4"),
				t("common:usefulLinks.czechLanguage.text7"),
				t("common:usefulLinks.czechLanguage.text8"),
				t("common:usefulLinks.czechLanguage.text9"),
			],
		},
		"Adaptační skupiny": {
			header: t("common:usefulLinks.adaptation.header"),
			leftHalf: [
				t("common:usefulLinks.adaptation.link1"),
				t("common:usefulLinks.adaptation.text2"),
			],
			rightHalf: [],
		},
		"Učebnice a materiály k výuce": {
			header: t("common:usefulLinks.teachingMaterials.header"),
			leftHalf: [
				t("common:usefulLinks.teachingMaterials.link1"),
				t("common:usefulLinks.teachingMaterials.text1"),
				t("common:usefulLinks.teachingMaterials.link2"),
				t("common:usefulLinks.teachingMaterials.text2"),
			],
			rightHalf: [
				t("common:usefulLinks.teachingMaterials.link3"),
				t("common:usefulLinks.teachingMaterials.text4"),
			],
		},
		Tlumočení: {
			header: t("common:usefulLinks.interpretation.header"),
			leftHalf: [
				t("common:usefulLinks.interpretation.link1"),
				t("common:usefulLinks.interpretation.text2"),
			],
			rightHalf: [
				t("common:usefulLinks.interpretation.link2"),
				t("common:usefulLinks.interpretation.text4"),
				t("common:usefulLinks.interpretation.link3"),
			],
		},
		"Zdravotní a sociální péče": {
			header: t("common:usefulLinks.healthCare.header"),
			leftHalf: [
				t("common:usefulLinks.healthCare.text1"),
				t("common:usefulLinks.healthCare.text2"),
				t("common:usefulLinks.healthCare.link1"),
			],
			rightHalf: [
				t("common:usefulLinks.healthCare.text3"),
				t("common:usefulLinks.healthCare.text4"),
				t("common:usefulLinks.healthCare.text5"),
				t("common:usefulLinks.healthCare.link2"),
				t("common:usefulLinks.healthCare.text6"),
			],
		},
		"Psychologická pomoc a terapie": {
			header: t("common:usefulLinks.psychologicalHelp.header"),
			leftHalf: [
				t("common:usefulLinks.psychologicalHelp.link1"),
				t("common:usefulLinks.psychologicalHelp.text1"),
			],
			rightHalf: [
				t("common:usefulLinks.psychologicalHelp.link2"),
				t("common:usefulLinks.psychologicalHelp.link3"),
				t("common:usefulLinks.psychologicalHelp.text2"),
			],
		},
		"Veterinární péče a péče o zvířata": {
			header: t("common:usefulLinks.veterinaryAssistance.header"),
			leftHalf: [
				t("common:usefulLinks.veterinaryAssistance.text1"),
				t("common:usefulLinks.veterinaryAssistance.link1"),
				t("common:usefulLinks.veterinaryAssistance.text2"),
			],
			rightHalf: [],
		},
		"Právní pomoc": {
			header: t("common:usefulLinks.legalHelp.header"),
			leftHalf: [
				t("common:usefulLinks.legalHelp.text1"),
				t("common:usefulLinks.legalHelp.text2"),
			],
			rightHalf: [],
		},
		"Volnočasové aktivity": {
			header: t("common:usefulLinks.freeTimeActivities.header"),
			leftHalf: [
				t("common:usefulLinks.freeTimeActivities.text1"),
				t("common:usefulLinks.freeTimeActivities.text2"),
			],
			rightHalf: [],
		},
	};

	const categoryObj = content[offerType.name];
	return (
		<div>
			{/*Verze pro desktop*/}
			<div className="hidden md:block w-auto mt-20 md:pl-10 md:mx-5 md:mb-10 bg-[#FFF5D2]">
				<p className="pt-3 text-[#000000] font-bold text-[18px] leading-[27px]">
					{categoryObj.header}
				</p>
				<div className="grid grid-cols-2 pt-10 pb-10 text-[16px]">
					<div>
						{categoryObj.leftHalf.map((item, index) => {
							return (
								<p
									className="mb-5"
									key={index}
									dangerouslySetInnerHTML={{
										__html: item,
									}}
								/>
							);
						})}
					</div>
					<div>
						{categoryObj.rightHalf.map((item, index) => {
							return (
								<p
									className="mb-5"
									key={index}
									dangerouslySetInnerHTML={{
										__html: item,
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>

			{/*Verze pro mobilni zarizeni*/}
			{isOverlayShown && (
				<div className="absolute top-0 block w-full md:hidden mt-20 px-10 py-5 rounded-[10px] bg-[#FFF5D2]">
					<div className="flex justify-end">
						{/*TODO*/}
						<ButtonBack onModalClose={onModalClose} />
					</div>
					<p className="pt-3 text-[#000000] font-bold text-[18px] leading-[27px]">
						{categoryObj.header}
					</p>
					<div className="grid pt-10 pb-10 text-[16px]">
						<div>
							{categoryObj.leftHalf.map((item) => {
								return (
									<p
										className="mb-5"
										key={Math.random() + 1}
										dangerouslySetInnerHTML={{
											__html: item,
										}}
									/>
								);
							})}
						</div>
						<div>
							{categoryObj.rightHalf.map((item) => {
								return (
									<p
										className="mb-5"
										key={Math.random() + 1}
										dangerouslySetInnerHTML={{
											__html: item,
										}}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
