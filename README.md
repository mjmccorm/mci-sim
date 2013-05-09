mci-sim
=======
Mass Casualty Simulator

Purpose:  This allows first responders to practice triaging patients by viewing a mass casualty photo of several injured people and assigning a triage tag based on a persons vital signs, etc.



Comments:
 4/24/2013 - Still Creating a definition for comment style.  Try the YUI
 
 Functions:
/*-----------------------------------------------------------
* FUNCTION NAME - Purpose
* parameters
* return values
*-----------------------------------------------------------*/
 
 
 --Person--
 id
 name
 age
 weight(kg)
 current vitals
 vitals history
 SAMPLE
 OPQRST
 triage tag id
 triage status
 
 --Vitals--
 systolic bp
 diastolic bp
 pulse rate
 pulse quality
 respiration rate
 respiration quality
 temp (C)
 skin color
 skin condition
 blood sugar
 capnography
 ekg
 timestamp
 
 --Events--
 Events are randomly assigned to patients.
 Events will have timers that change patient bodyState if conditions are not met
 Events have gFactors (god factor) (a weighted boolean, ie 90% false) that leads to patient death no matter what interventions
 Events have logic that checks for interventions and affects patients BodyState
 
 if (gFactor){ set bodyState(compensated) then setBodyState(decompensated) then set BodyState(irreversible) then setBodyState(death)}else {consider interventions{
 if (patient hasBleeding  && bleeding not controled){ setbodyState('compensated');
 if (patient hasAmputation && hasBleeding && bleeding not controled){ setbodyState('decompensated')}
 if (patient hasBleeding && bleeding is controlled){ setbodyState('normal');}
 if (patient hasHeadInjury ...
 if (patient hasClosedFracture...
 if (patient hasInternalBleeding...
 if (patient hasDeformity ...
 if (patient hasLowBloodSugar ...
 if (patient hasAlteredLevelOfConsciousness ...
 
 
 Sources:
 Start Triage Alorithm 
 http://www.chemm.nlm.nih.gov/startadult.htm
 Jump Start Triage Algorithm
 http://www.chemm.nlm.nih.gov/startpediatric.htm
 SALT Triage Algorithm
 http://www.chemm.nlm.nih.gov/salttriage.htm
 