from django.db import models

class Item(models.Model):
    """A named item belonging to a group. Names are unique within a group."""

    class Group(models.TextChoices):
        """dropdown menu, first value database label and second for the user"""

        # Limit choices to primary or secondary. 
        # NOTE: Enforced by Django validation/forms, NOT at the database level.
        PRIMARY = 'primary', 'Primary'
        SECONDARY = 'secondary', 'Secondary'

    name = models.CharField(max_length=100)
    group = models.CharField(max_length=20, choices=Group.choices)
    created_at = models.DateTimeField(auto_now_add=True)   
    updated_at = models.DateTimeField(auto_now=True)       

    class Meta:
        #enforces functional requirements of each group containing only unique item names

        ordering = ['name', 'group']
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'group'],
                name='unique_name_per_group',
            )
        ]
    def __str__(self):
        return f"{self.name} ({self.get_group_display()})"
