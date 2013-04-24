mci-sim
=======

Mass Casualty Simulator

Purpose:  This allows first responders to practice triaging patients by viewing a mass casualty photo of several injured people and assigning a triage tag based on a persons vital signs, etc.

Objects:

Person - has a name, id, age, weight, current set of vitals, vitals history, location(x,y), triage_status

Vitals - has systolic/diastolic bp, pulse, respiration rate, other category

Tags - triage tags have id, location, number of stubs

Objects to be developed
Event:  ie,  bleeding, loss of consciousness, amputation, etc.  I'm envisioning each person will have a linked list of events.

Condition:  ie  blood pressure:  if current_vitals.bp < 90/60, display shock.  

State:  Normal, compensated shock, decompensated shock, irreversible shock, death
